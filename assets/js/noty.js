//for client side Noty/  with fetch/xhr req
function showNotification(type, msg) {
    new Noty({
        theme: 'relax',
        text: msg,
        type: type,
        layout: 'top',
        timeout: 2500
    }).show();

}