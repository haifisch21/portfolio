$(document).ready(function () {
    $('#contactAnchor .request').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
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

    var input = document.querySelector("#phone");
    window.intlTelInput(input, {
        onlyCountries: ["ru", "ua"],
        initialCountry: "ua",
        customPlaceholder: "Number"
    });
});

