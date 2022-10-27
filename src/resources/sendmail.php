<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

//Тело письма
$subject = 'проект euroflex';
$body = '<h1>Проект euroflex</h1>';
if (trim(!empty($_POST['user']))) {
  $body .= '<p><strong>Имя: </strong> ' . $_POST['user'] . '</p>';
}
if (trim(!empty($_POST['user_phone']))) {
  $body .= '<p><strong>Телефон: </strong> ' . $_POST['user_phone'] . '</p>';
}
if (!empty($_POST['check'])) {
  $checkItems = $_POST['check'];
  $body .= '<p><strong>Выбор категорий: </strong>' . '</p>';
  foreach ($checkItems as $checkItem) {
    $body .= $checkItem . '<br>';
  }
}

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;
  $mail->Debugoutput = function ($str, $level) {
    $GLOBALS['status'][] = $str;
  };

  // Настройки почты
  $mail->Host       = 'smtp.yandex.ru';
  $mail->Username   = 'glaz-nad';
  $mail->Password   = 'wfbadplrbnjnrhqs';
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->setFrom('glaz-nad@yandex.ru', 'euroflex'); //отправитель письма
  $mail->addAddress('glaznad75@gmail.com');  // Получатель письма

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $subject;
  $mail->Body = $body;

  // Проверяем отправление сообщения
  if ($mail->send()) {
    $message = "<p>Данные отправлены</p>";
    $status = "ok";
  } else {
    $message = "<p>Ошибка при отправлении данных. Сообщение не было отправлено.</p>";
    $status = "{$mail->ErrorInfo}";
  }
} catch (Exception $e) {
  $message = "<p>Ошибка при отправлении данных</p>";
  $status = "<p>Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}</p>";
}
echo json_encode(["message" => $message, "status" => $status, "Ваши данные" => $body]);
