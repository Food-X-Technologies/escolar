# escolar
Replace properties in json with file contents.
```
{
 "property": "#./contents.txt#",
}
```
Reads from properties that start and end with '#'; containing a file name inbetween.

## Example
### [Json File](https://github.com/Food-X-Technologies/escolar/blob/main/example/example.json)
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
### [Text File](https://github.com/Food-X-Technologies/escolar/blob/main/example/contents.txt)
```
working, y'all!
```
### Output
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