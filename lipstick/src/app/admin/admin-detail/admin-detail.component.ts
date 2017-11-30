import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SimpleListInterface } from '../../_interfaces/simplelist.interface';
import { AdminService } from '../../_services/admin.service';
import { AlertService } from '../../_services/alert.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cnx-admin-detail',
    templateUrl: './admin-detail.component.html',
    styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {
    @Input() apiString: string;
    @Input() data: Observable<any>
    @Input() details: SimpleListInterface;
    @Input() objectAdd: boolean;

    @Output() dataChange = new EventEmitter<any>();
    @Output() objectAddChange = new EventEmitter<boolean>();

    nameForm: FormGroup;
    showObject: boolean;
    valueForm: boolean = false; // Different form/display if object has values /settings

    constructor(
        private adminService: AdminService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.nameForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            id: undefined,
            value: '',
        })
        if (this.details && this.details.value) {
            this.valueForm = true;
        }
    }

    onEdit(name: any) {
        // Set form values for the current object, show object
        this.nameForm.controls.name.setValue(this.details.name);
        this.nameForm.controls.id.setValue(this.details.id);
        this.nameForm.controls.value.setValue(this.details.value);
        this.showObject = true;
    }

    onClose(name: any) {
        this.nameForm.reset();
        this.showObject = false;
        this.objectAddChange.emit(false);
    }

    onSubmit({value, valid}: {value: SimpleListInterface, valid: boolean}) {
        if (value.id || value.value) { // Settings does not have an ID so on edit check for a value
            this.nameForm.reset();
            this.showObject = false; // Hide the object
            // Update the object
            this.adminService.putData(this.apiString, value).subscribe(
                response => {
                    this.details.name = value.name;
                    this.details.value = value.value;
                    // When editing a object, dont reload all the data only the comment.
                },
                error => {
                    this.alertService.error(
                        'Failed to update the object. Please try again later.'
                    );
                    console.log('Error Message: ' + error);
                }
            );
        } else {
            // Save the object
            this.adminService.postData(this.apiString, value).subscribe(
                response => {
                    this.dataChange.emit(this.adminService.getAPI(this.apiString));
                    this.objectAddChange.emit(false); // Hide the add form
                },
                error => {
                    this.alertService.error(
                        'Failed to create the object. Please try again later.'
                    );
                    console.log('Error Message: ' + error);
                }
            );
        }
    }
}
