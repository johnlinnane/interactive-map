<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Traditional Traveller Camps</title>
  
    <link rel="stylesheet" href="style.css" />


</head>
  
  
  <body>



<?php

############################################# SET DEFAULT TEXT FOR FIELDS #############################################

$postData = $uploadedFile = $statusMsg = '';
$msgClass = 'errordiv';


############################################# GET FORM DATA #############################################

if(isset($_POST['submit'])){
    // Get the submitted form data as php variables
    $postData = $_POST;
    $type = $_POST['type'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $sliderHidden = $_POST['sliderHidden'];
    $coordHidden = $_POST['coordHidden'];
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];



############################################# TEST FORM DATA #############################################

    // Check whether submitted data is not empty
    if(!empty( $visitor_email) && !empty($name) && !empty($title) && !empty($description)){

        // Validate email
        if(filter_var( $visitor_email, FILTER_VALIDATE_EMAIL) === false){
            $statusMsg = 'Please enter your valid email.';
        }else{
            $uploadStatus = 1;

############################################# UPLOAD FILE #############################################

            // Upload attachment file
            if(!empty($_FILES["attachment"]["name"])){

                // File path config
                $targetDir = "uploads/";
                $fileName = basename($_FILES["attachment"]["name"]);
                $targetFilePath = $targetDir . $fileName;
                $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);

                // Allow certain file formats
                $allowTypes = array('pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg');
                if(in_array($fileType, $allowTypes)){
                    // Upload file to the server
                    if(move_uploaded_file($_FILES["attachment"]["tmp_name"], $targetFilePath)){
                        $uploadedFile = $targetFilePath;
                    }else{
                        $uploadStatus = 0;
                        $statusMsg = "Sorry, there was an error uploading your file.";
                    }
                }else{
                    $uploadStatus = 0;
                    $statusMsg = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.';
                }
            }

############################################# SEND EMAIL IF SUCCESSFUL #############################################


            if($uploadStatus == 1){

                // Recipient
                $toEmail = 'panisterfatheroy@gmail.com';
                // Sender
                $from = 'info@travellercollection.com';
                $fromName = 'TravellerColleciton';
                // Subject
                $emailSubject = 'New Site Submitted by '.$name;
                // Message
                $htmlContent = '<h2>New Site Submitted</h2>
                    <p><b>Type:</b><br/>'.$type.'</p>
                    <p><b>Title:</b> '.$title.'</p>
                    <p><b>Description:</b><br/>'.$description.'</p>
                    <p><b>Time:</b><br/>'.$sliderHidden.'</p>
                    <p><b>Coordinates:</b><br/>'.$coordHidden.'</p>
                    <p><b>Name:</b> '.$name.'</p>
                    <p><b>Email:</b> '. $visitor_email.'</p>';
                // Header for sender info
                $headers = "From: $fromName"." <".$from.">";

############################################# ID THE FILE #############################################


                if(!empty($uploadedFile) && file_exists($uploadedFile)){

                    // Boundary
                    $semi_rand = md5(time());    // generates Message Digest Algorithm hash
                    $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

                    // Headers for attachment
                    $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\"";

                    // Multipart boundary
                    $description = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
                    "Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n";

############################################# ATTACH FILE #############################################

                    // Preparing attachment
                    if(is_file($uploadedFile)){
                        $description .= "--{$mime_boundary}\n";
                        $fp =    @fopen($uploadedFile,"rb");
                        $data =  @fread($fp,filesize($uploadedFile));
                        @fclose($fp);
                        $data = chunk_split(base64_encode($data));
                        $description .= "Content-Type: application/octet-stream; name=\"".basename($uploadedFile)."\"\n" .
                        "Content-Description: ".basename($uploadedFile)."\n" .
                        "Content-Disposition: attachment;\n" . " filename=\"".basename($uploadedFile)."\"; size=".filesize($uploadedFile).";\n" .
                        "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
                    }

                    $description .= "--{$mime_boundary}--";
                    $returnpath = "-f" .  $visitor_email;

                    // Send email
                    $mail = mail($toEmail, $emailSubject, $description, $headers, $returnpath);

                    // Delete attachment file from the server
                    // @unlink($uploadedFile);
                }else{
                     // Set content-type header for sending HTML email
                    $headers .= "\r\n". "MIME-Version: 1.0";
                    $headers .= "\r\n". "Content-type:text/html;charset=UTF-8";

                    // Send email
                    $mail = mail($toEmail, $emailSubject, $htmlContent, $headers);
                }

############################################# SUCCESS MESSAGE #############################################


                // If mail sent
                if($mail){
                    $statusMsg = 'Your site has been submitted successfully!';
                    $msgClass = 'succdiv';

                    $postData = '';
                }else{
                    $statusMsg = 'Woops! Your site submission failed, please try again.';
                }
            }
        }
    }else{
        $statusMsg = 'Please fill all the fields.';
    }
}
?>

<!-- *********************** INTRO CODE *************************** -->


    <!-- Display submission status -->
<?php if(!empty($statusMsg)){ ?>
    <div class="header">Traveller Collection
    </div>

    <div id="statusBody">
        <p class="statusMsg <?php echo !empty($msgClass)?$msgClass:''; ?>"><?php echo $statusMsg; ?></p>

        <div id="backDiv">
            <a href="index.html" class="button">Back To Map</a>
        </div> 
    </div>
<?php } ?>




  </body>
</html>
