var appController = (function() {
    var formInputs = [
        document.getElementById('name'),
        document.getElementById('email'),
        document.getElementById('tel'),
        document.getElementById('message')
    ];

    var btnEnviar = document.getElementById('btn-enviar');

    function getFormValue() {
        return formInputs.map(function(input) {
            return input.value;
        });
    }

    function onClickButton(event) {
        event.preventDefault();
        console.log(getFormValue());
    }

    return {
        init: function() {
            btnEnviar.addEventListener('click', onClickButton);
        },
    };
})();

appController.init();
