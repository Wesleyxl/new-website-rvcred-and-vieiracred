<?php

header("Content-type: text/html; charset=utf-8");
$website = $_POST['website'];
$name = $_POST['userName'];
$email = $_POST['userEmail'];
$howToKnow = $_POST['userHowToKnow'];
$phone = $_POST['userPhone'];
$message = $_POST['userMessage'];

$formcontent ="De: $name<br>Tel: $phone<br>Email: $email<br>Como nos conheceu: $howToKnow<br><br><br>Mensagem: $message";

if($website == 'vieiracred')
{
    $recipient = "erick@vieiracred.com.br";
    $subject = "Novo contato do site vieiracred.com.br";
    $mailheader = "From: Vieiracred.com.br<contato@vieiracred.com.br>\r\nContent-type: text/html; charset=utf-8\r\nBcc: matheus@consitech.com.br";

}
else if($website == 'rvcred')
{
    $recipient = "anderson@rvcred.com.br";
    $subject = "Novo contato do site rvcred.com.br";
    $mailheader = "From: RvCred.com.br<contato@rvcred.com.br>\r\nContent-type: text/html; charset=utf-8\r\nBcc: matheus@consitech.com.br";

}
else if($website == 'liderfinanceira')
{
    $recipient = "wesley@liderfinanceira.com";
    $subject = "Novo contato do site liderfinanceira.com";
    $mailheader = "From: Liderfinanceira.com<contato@liderfinanceira.com>\r\nContent-type: text/html; charset=utf-8\r\nBcc: matheus@consitech.com.br";

}
else if($website == 'torrespromotora')
{
    $recipient = "thiago.dias@torrespromotora.com.br";
    $subject = "Novo contato do site torrespromotora.com.br";
    $mailheader = "From: torrespromotora.com.br<contato@torrespromotora.com.br>\r\nContent-type: text/html; charset=utf-8\r\nBcc: matheus@consitech.com.br";

}



$response = [
    'type' => '',
    'text' => ''
];

if(@mail($recipient, $subject, $formcontent, $mailheader))
{

    $response['type'] = 'success';
    $response['text'] = 'Email enviado';
}
else{

    $response['type'] = 'error';
    $response['text'] = 'Ocorreu um erro no envio, por gentileza entre em contato conosco através do email suporte@vieiracred.com.br';

}


print_r(json_encode($response));



?>