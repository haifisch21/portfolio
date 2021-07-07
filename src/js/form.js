$(document).ready(function () {
    $('#contactAnchor .request').validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
            }
        },
        messages: {
            name: "",
            email: "",
            phone: ""
        },
        highlight: function (element) {
            $(element)
                .closest('.request-block')
                .addClass('error')
        },
        unhighlight: function (element) {
            $(element)
                .closest('.request-block')
                .removeClass('error')
        }
    });

    $('form').submit(function (e) {
        e.preventDefault();
        var hasEmpty = false;
        // Перебираем все поля формы
        $('form').find('input').each(function() {
            if ($(this).prop('required')) {
                // если поле обязательное, но пустое, то hasEmpty становится true
                hasEmpty = hasEmpty || !$(this).val();
            }
        });
        if (hasEmpty) {
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize(),
            }).done(function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Олично!',
                    text: 'В ближайшее время я свяжусь с Вами',
                })
                $(this).find("input").val("");
                $('form').trigger('reset');
            });
            return false;
        }
    });
});