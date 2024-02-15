print char(27) + "[32mGreetings! (using ANSI escape code)"
while true
  s = input("Name? ")
  if s == "quit" then exit
  print "Hello, " + s
  yield
end while
