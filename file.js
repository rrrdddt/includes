var html = await (await fetch('/wp-admin/user-new.php')).text();
var doc = new DOMParser().parseFromString(html, 'text/html');
var nonce = doc.querySelector('#_wpnonce_create-user').value;

console.log(nonce);
