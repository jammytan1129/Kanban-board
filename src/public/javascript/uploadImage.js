$(document).ready(() => {

    const $file = $('#file');
    var loadingImage = false;
    var image;
    var fileTypes = ['jpg', 'jpeg', 'png'];  //acceptable file types    
    function readURL(input) {
        if (input.files && input.files[0]) {
            var extension = input.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
            isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types    
            if (isSuccess) { //yes
                console.log('reader files....');                
                var reader = new FileReader();
                reader.onload = function (e) { // async
                    $('#upload-img').attr('src', e.target.result);
                    loadingImage = false;                                    
                    console.log('reader files end...');
                }
                reader.readAsDataURL(input.files[0]);  
                $('.upload-content h1').remove();
                $('#img-loading').hide();
                return true;        
            }                
            else {
                loadingImage = false;
                $('.upload-content').append('<h1>File Must Be photo!</h1>'); 
                $('#img-loading').hide();
                return false;                       
            }
        }
        $('#img-loading').hide();        
    }

    file.addEventListener('change', function(e) {
        loadingImage = true;        
        $('.upload-content').show();
        $('#img-loading').show();
        setTimeout(function() {
             if (readURL(file)) {
                 console.log('set image');
                image = e.target.files[0];                
             }
        }, 2000);
    });
    
    $('.publish-btn').on('click', () => {
        if (loadingImage) {
            $('.message').show();
            $('.message p').html("Wait Image Loading....");            
            return;
        }
        $('#loading').show();
        $('.publish-btn').hide();
        var token = $("#g-recaptcha-response").val();
        var article = $('#article').val();
        var form = new FormData();
        if (image) {
            form.append('file', image);
        }
        form.append('token', token);
        form.append('article', article);        
        $.ajax({
            type : 'POST',
            url : '/post',
            data : form,
            processData: false,
            contentType: false,
            success : data => {
                console.log(data);
                window.location.href = "/redirect";
            },
            error : (jqXHR, exception) => {
                if (jqXHR.status == 500) {
                    $('.message').show();
                    $('.message p').html(JSON.parse(jqXHR.responseText).error);
                }
                $('#loading').hide();
                $('.publish-btn').show();        
            }
        });

    });    
});