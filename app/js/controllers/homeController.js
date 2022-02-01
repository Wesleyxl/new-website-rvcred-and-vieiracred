angular.module("myapp")
    .controller("HomeController", ['$scope', '$stateParams', '$http', '$state', '$interval', "$rootScope", function($scope, $stateParams, $http, $state, $interval, $rootScope) {

        console.log("Estou sendo lido")

        config = new Object();
        config.headers = {
            'Authorization': "Bearer " + localStorage.getItem('appToken')
        };

        $scope.info = {};

        $scope.info.urlFull = window.location.href;
        $urlAtual = $scope.info.urlFull.split('.');
        // $urlAtual = ["http://vieiracred","com","br/#!/"];

        if($urlAtual[0] == 'http://www' || $urlAtual[0] == 'https://www' || $urlAtual[0] == 'http://local')
        {
            $urlAtual = $urlAtual[1];
        }
        else {
            $urlAtual = $urlAtual[0];
            $urlAtual = $urlAtual.replace('https://', '').replace('http://', '');
        }

        $scope.info.urlAtual = $urlAtual;

        $scope.info.dataAtual = new Date();

        $http.get('app/infos/' + $urlAtual + '.json').then(function (response) {
            $scope.info.data = response.data;
            $rootScope.info = $scope.info;
            console.log('aqui');
            console.log($rootScope.info);

            document.title = $rootScope.info.data.empresa;
            $("link[rel='icon']").attr("href", $rootScope.info.data.favicon);

        });








        $("#submit_btn").click(function () {

            //disable submit button on click
            $("#submit_btn").attr("disabled", "disabled");
            $("#submit_btn span").text('Enviando');
            $("#submit_btn i").removeClass('d-none');

            var user_name = $('input[name=name]').val();
            var user_howToKnow = $('input[name=howToKnow]').val();
            var user_email = $('input[name=email]').val();
            var user_phone = $('input[name=phone]').val();



            var user_message = $('textarea[name=message]').val();

            //simple validation at client's end
            var post_data, output;
            var proceed = true;
            if (user_name == "") {
                proceed = false;
            }
            if (user_email == "") {
                proceed = false;
            }
            // if (user_phone == "") {
            //proceed = false;
            // }

            if (user_message == "") {
                proceed = false;
            }

            // proceed = true;

            //everything looks good! proceed...
            if (proceed) {

                //data to be sent to server
                post_data = {
                    'userName': user_name,
                    'userEmail': user_email,
                    'userHowToKnow': user_howToKnow,
                    'userPhone': user_phone,
                    'userMessage': user_message,
                    'website': $urlAtual,
                };

                //Ajax post data to server
                $.post('sendform.php', post_data, function (response) {
                    console.log(response);
                    //load json data from server and output message
                    if (response.type == 'error') {
                        output = '<div class="alert-danger" style="padding:10px; margin-bottom:30px;">' + response.text + '</div>';
                    } else {
                        output = '<div class="alert-success" style="padding:10px; margin-bottom:30px;">' + response.text + '</div>';

                        //reset values in all input fields
                        $('.contact-form input').val('');
                        $('.contact-form textarea').val('');
                    }

                    $("#result").hide().html(output).slideDown();

                    // enable submit button on action done
                    $("#submit_btn").removeAttr("disabled");
                    $("#submit_btn span").text('Enviar');
                    $("#submit_btn i").addClass('d-none');

                }, 'json');

            }
            else {
                output = '<div class="alert-danger" style="padding:10px; margin-bottom:30px;">Por favor preencha todos os campos.</div>';
                $("#result").hide().html(output).slideDown();

                // enable submit button on action done
                $("#submit_btn").removeAttr("disabled");
                $("#submit_btn span").text('Enviar');
                $("#submit_btn i").addClass('d-none');
            }

        });







    }

    ]);
