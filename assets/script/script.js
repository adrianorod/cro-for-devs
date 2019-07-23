const utils = (($wd) => {
    function _getQueryString(search) {
        let hashes = search.slice(search.indexOf('?') + 1).split('&');
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=');
            return Object.assign(params, {[key]: decodeURIComponent(val)});
        }, {});
    }

    return {
        getQueryString: _getQueryString($wd.location.search),
    };
})(window);

const appController = (($dc) => {
    this.state = {
        form: $dc.querySelector('form'),
        formInputs: [
            $dc.querySelector('#name'),
            $dc.querySelector('#email'),
            $dc.querySelector('#tel'),
            $dc.querySelector('#message'),
        ],
        btnEnviar: $dc.querySelector('#btn-enviar'),
        feedbackField: $dc.querySelector('.feedback'),
    };

    function _getFormValue() {
        return state.formInputs.map((input) => input.value);
    }

    function _onClickButton(event) {
        event.preventDefault();
        _setFeedbackMsg('Dados salvos com sucesso!');
        console.log(_getFormValue());
    }

    function _setFeedbackMsg(value) {
        if (typeof value !== 'string') return false;
        state.feedbackField.innerHTML = value;
        setTimeout(() => {
            state.feedbackField.innerHTML = '';
        }, 5000);
    }

    return {
        init: () => {
            state.btnEnviar.addEventListener('click', _onClickButton);
        },
    };
})(document);

appController.init();
