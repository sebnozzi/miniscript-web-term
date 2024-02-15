print char(27) + "[32mGreetings! ", ""
print "(using ANSI escape code)"
while true
  s = input("Name? ")
  if s == "quit" then exit
  print "Hello,", " "
  print s
  yield
end while
