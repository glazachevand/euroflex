<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

//Тело письма
$subject = 'проект euroflex';
$body = '<p style="color: #52677c;">Проект euroflex</p><br><p><strong>Данные: </strong></p></br>';
if (trim(!empty($_POST['user']))) {
  $body .= '<strong>Имя: </strong> ' . $_POST['user'] . '</p>';
}
if (trim(!empty($_POST['user_phone']))) {
  $body .= '<p><strong>Телефон: </strong> ' . $_POST['user_phone'] . '</p></br>';
}
if (!empty($_POST['check'])) {
  $checkItems = $_POST['check'];
  $body .= '<p><strong>Выбор категорий: </strong>' . '</p>';
  foreach ($checkItems as $checkItem) {
    $body .= '<p>' . $checkItem . '</p>';
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
    $message = "<p>Ваши данные отправлены. Спасибо!</p></br>";
    $status = "ok";
  } else {
    $message = "<p>Ошибка при отправлении данных. Сообщение не было отправлено.</p></br>";
    $status = "<p>Причина ошибки: {$mail->ErrorInfo}</p>";
  }
} catch (Exception $e) {
  $message = "<p>Ошибка при отправлении данных</p></br>";
  $status = "<p>Причина ошибки: {$mail->ErrorInfo}</p>";
}
echo json_encode(["message" => $message, "status" => $status, "data" => $body]);
