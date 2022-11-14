from threading import Timer

def hello():
    print("hello, world")
    Timer(30.0, hello).start()

Timer(30.0, hello).start() 