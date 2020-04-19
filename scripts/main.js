$(document).ready(function() {

    $('#txtDataNascimento').mask("00/00/0000");
    $('#txtCpf').mask('000.000.000-00', { reverse: true });

    $('#frmCadastro').on('submit', function(e) {
        e.preventDefault();


        var form = document.querySelector('.needs-validation');

        if (form.checkValidity() === false) {

            e.stopPropagation();
            form.classList.add('was-validated');

        } else {

            var validaForm = ValidaFormulario();

            if (validaForm.ehValido) {
                alert("Enviado");

            } else {
                alert("Verifique se todos os campos foram preenchidos corretamente");

            }
        }
    });


});

function ValidaFormulario() {

    var result = {
        nome: {},
        email: {},
        dataNascimento: {},
        cpf: {},
        senha: {},
        confirmarSenha: {},
        ehValido: false
    };

    var nome = $('#txtNome').val();
    var email = $('#txtEmail').val();
    var dataNascimento = $('#txtDataNascimento').val();
    var cpf = $('#txtCpf').val();
    var senha = $('#txtSenha').val();
    var confirmaSenha = $('#confirmaSenha').val();

    if (nome != undefined && nome != '') {
        result.nome = nome;
    } else {
        alert("Campo nome com erro");
        return result;
    }

    if (email != '' && email.match(/@/g) != null) {
        result.email = email;
    } else {
        alert("Campo email com erro");
        return result;
    }

    if (isDate(dataNascimento)) {
        result.dataNascimento = dataNascimento;
    } else {
        alert("Data inválida");
        return result;
    }

    if (senha != '' && senha.length >= 6) {
        result.senha = senha;
    } else {
        alert("Campo senha com erro");
        return result;
    }

    if (confirmaSenha != '' && confirmaSenha.length >= 6 && confirmaSenha == senha) {
        result.confirmaSenha = confirmaSenha;
    } else {
        alert("Confira se as senhas estão iguais");
        return result;
    }

    result.ehValido = true;
    return result;
}

function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;
    //Declare Regex 
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?
    if (dtArray == null)
        return false;
    //Checks for mm/dd/yyyy format.
    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];
    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;

}