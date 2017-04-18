$(document).ready(function(){

	$("#invite-people").html(function(index,html){
		return '<i class="fa fa-plus" aria-hidden="true"></i> '+html;
	});
	$("#threads").html(function(index,html){
		return '<i class="fa fa-commenting-o" aria-hidden="true"></i> '+html;
	});

	$(".chat-group a").html(function(index,html){
		return '<i class="fa fa-slack" aria-hidden="true"></i> '+html;
	});
	
	$(".second-level a.offline").html(function(index,html){
		return '<i class="fa fa-circle-o" aria-hidden="true"></i> '+html;
	});	
	
	$(".second-level a.online,#chat-username.online").html(function(index,html){
		return '<i class="fa fa-circle" aria-hidden="true"></i> '+html;
	});
    $(".message").mouseover(function(e) {
    	$(this).find('.message-toolbar').addClass('active');
    });
    $(".message").mouseout(function(e) {
    	$(this).find('.message-toolbar').removeClass('active');
    });

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

	var requestURL = "https://chat-room-fernando13.c9users.io/api/message/1";

	//var requestURL = "https://chat-room-fernando13.c9users.io/api/ChatTimeline.class.php";
	
	$.ajax({
	  method: "GET",
	  url: requestURL,
	  dataType: "json",
	  success: mySuccessListener,
	  error: myErrorListener
	});


function mySuccessListener(jsonResponse){

//	alert(" i rules!");

	var messageHtmlStructure = '<div class="row message">';
	messageHtmlStructure += 		'<div class="col-xs-1 avatar">';
    messageHtmlStructure += 			'<a style="background-image: url(\'assets/avatar1.png\');"></a>';
    messageHtmlStructure += 		'</div>';
    messageHtmlStructure += 		'<div class="col-xs-11">';
    messageHtmlStructure += 			'<div class="row">';
    messageHtmlStructure += 				'<div class="message-toolbar btn-group" role="group">';
    messageHtmlStructure += 					'<button type="button" class="btn btn-default">';
    messageHtmlStructure += 						'<i class="fa fa-reply" aria-hidden="true"></i>';
    messageHtmlStructure += 					'</button>';
    messageHtmlStructure += 					'<button type="button" class="btn btn-default">';
    messageHtmlStructure += 						'<i class="fa fa-pencil" aria-hidden="true"></i>';
    messageHtmlStructure += 					'</button>';
    messageHtmlStructure += 					'<button type="button" class="btn btn-default">';
    messageHtmlStructure += 						'<i class="fa fa-trash-o" aria-hidden="true"></i>';
    messageHtmlStructure += 					'</button>';
    messageHtmlStructure += 				'</div>';
	messageHtmlStructure += 				'<div class="col-xs-12">';
	messageHtmlStructure += 					'<span class="message-username">';
	messageHtmlStructure +=							'+jsonResponse.data.author.username+';
	messageHtmlStructure +=						'</span> <span class="message-date">3:50 PM</span>';
	messageHtmlStructure += 				'</div>';
	messageHtmlStructure += 				'<div class="col-xs-12 message-content">';
	messageHtmlStructure += 					'+jsonResponse.data.content+';
	messageHtmlStructure += 				'</div>';
	messageHtmlStructure += 			'</div>';
    messageHtmlStructure += 		'</div>';
    messageHtmlStructure += 	'</div>'; 
    
	//myObj = JSON.parse(data);
    
	document.getElementById("test").innerHTML =  jsonResponse.data.content;

}

function myErrorListener(data, errorString){
	alert(errorString);
}
	
	
});
	


