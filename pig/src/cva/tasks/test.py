from cva.celery import app

@app.task
def test_scheduled_task():
    """Test to see if scheduled tasks will run.
    Look for this printed sentence in the terminal window.
    """
    #print("Test schedule task was started")
    pass
