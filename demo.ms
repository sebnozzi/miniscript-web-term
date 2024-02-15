import "module"
import "stringUtil"

module.greet

while true
  s = input("Name? ")
  if s == "quit" then exit
  print "hello".capitalized + ",", " "
  print s
  yield
end while
