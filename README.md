# escolar
Replace properties in json with file contents.
```
{
 "property": "#./contents.txt#",
}
```
Reads from properties that start and end with '#'; containing a file name inbetween.

## Example
### [Json File]()
```
{
    "property": "#./contents.txt#",
    "fake": [],
    "inner": {
        "nope": 123,
        "what": "yes"
    }
}
```
### [Text File]()
```
working, y'all!
```
### Output:
```
{
    "property": "working, y'all!",
    "fake": [],
    "inner": {
        "nope": 123,
        "what": "yes"
    }
}
```