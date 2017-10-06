# gulp-converter-character-entities

> Plugin for convert character entities (html, xml & etc)

## Support entities:

- [html2xml](entities/html2xml.json)

## Example work:
> for example html2xml:

```
&nbsp; -> #&160;
&lt; -> &#60;
```


## Install

```
$ npm install --save-dev gulp-converter-character-entities
```


## Usage

```js
var gulp = require('gulp');
var cce = require('gulp-converter-character-entities');
var my_entity = cce.entities.html2xml;

gulp.task('cmu', function () {
	return gulp.src('src/file.css')
		.pipe(cce.convert({entity: my_entity}))
		.pipe(gulp.dest('dist'));
});
```

## Easy to expand
```
var my_entity - simple json

{
 "key": "value",
 "&nbsp;": "&#160;"
}
```

## License

MIT © [free6k](https://github.com/free6k)
