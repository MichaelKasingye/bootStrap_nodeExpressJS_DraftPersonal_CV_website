

(function(){

    $('#btn-contact-submit').click((event)=>{
        if (event)
        event.preventDefault()
        var visitor ={
            name:$('#contact-form-name').val(),
            email:$('#contact-form-email').val(),
            message:$('#contact-form-message').val(),
        }
        $.ajax({
            url:'/api/subscriber',
            type:'POST',
            data:visitor,
            success:(response)=>{console.log(`success.. ${JSON.stringify(response)}`)},
            error:(response)=>{
               console.log(` UNSUCCESFUL ${JSON.stringify(response)}`)
            }
        })

    })
})()