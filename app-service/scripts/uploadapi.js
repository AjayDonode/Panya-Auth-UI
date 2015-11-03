app.post('/upload', function(req, res){
    var form = new formidable.IncomingForm(),
    files = [],
    fields = [];
    form.on('field', function(field, value) {
        fields.push([field, value]);
    })
    form.on('file', function(field, file) {
        console.log(file.name);
        files.push([field, file]);
    })
    form.on('end', function() {
        console.log('done');
        res.redirect('/forms');
    });
    form.parse(req);
});