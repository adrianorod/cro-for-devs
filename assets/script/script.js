const utils = (($wd, $dc) => {
    function _getQueryString(search) {
        let hashes = search.slice(search.indexOf('?') + 1).split('&');
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=');
            return Object.assign(params, {[key]: decodeURIComponent(val)});
        }, {});
    }

    function _setTestVersion() {
        const version = _getQueryString($wd.location.search).v;
        if (version) {
            $dc.querySelector('body').classList.add(`version-${version}`);
        }
    }

    return {
        getQueryString: _getQueryString($wd.location.search),
        setTestVersion: _setTestVersion,
    };
})(window, document);

const appController = (($dc, utils) => {
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

        testFunctions.v4.modifier._onClickButton();
    }

    function _setFeedbackMsg(value) {
        if (typeof value !== 'string') return false;
        state.feedbackField.innerHTML = value;
        setTimeout(() => {
            state.feedbackField.innerHTML = '';
        }, 5000);
    }

    // teste ab
    this.testFunctions = {
        v4: {
            modifier: {
                _onClickButton: () => {
                    if (utils.getQueryString.v === '4') {
                        testFunctions.v4.new._cleanForm();
                    }
                },
            },
            new: {
                _cleanForm: () => {
                    state.form.reset();
                },
            },
        },
    };
    // end - teste ab

    return {
        init: () => {
            state.btnEnviar.addEventListener('click', _onClickButton);
            utils.setTestVersion();
        },
    };
})(document, utils);

appController.init();
