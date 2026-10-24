import "module"
import "stringUtil"

module.greet

print "Here's a list:"
print range(1,10)

print "And here's a map:"
print {"foo":"bar"}

while true
  s = input("Name? ")
  if s == "quit" then exit
  print "hello".capitalized + ",", " "
  print s
  yield
end while
