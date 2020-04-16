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
                $(this).find("input").val("");
                $('form').trigger('reset');
            });
            return false;
        }
    });


    var input = document.querySelector("#phone");

    window.intlTelInput(input, {
        onlyCountries: ["ru", "ua"],
        autoFormat: false,
        nationalMode: false,
        initialCountry: "ua",
        numberType: "MOBILE",
        utilsScript: "/build/js/utils.js?1585994360633" // just for formatting/placeholders etc
    });
});

