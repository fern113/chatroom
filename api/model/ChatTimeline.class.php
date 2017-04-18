<?php


class ChatTimeline{

	/**
	 * All the members in the chat.
	 * @var array(ChatUser)
	 */
	protected $members;
	protected $id;

	/**
	 * A A copy of all the messages in the timeline
	 * @var array(ChatMessage)
	 */
	protected $messages; 

	public function getAllMembers() { return $this->members; }
	public function addMember($user)
	{
		array_push($this->members, $user);
		return $this;
	}
	public function removeMember($user)
	{
		$aux = array();
		foreach ($this->members as $u) {
			if($u !== $user){
				array_push($aux, $a);
			}
		}
		return $this;
	}

	public function getAllMessages() { return $this->messages; }
	public function addMessage($message)
	{
		array_push($this->messages, $message);
		return $this;
	}
	public function removeMessage($message)
	{
		$aux = array();
		foreach ($this->messages as $m) {
			if($m !== $message){
				array_push($aux, $m);
			}
		}
		return $this;
	}

	public function __construct()
	{
		$this->members = array();
		$this->messages = array();
		//$this->name = ();
		//$this->chat_type = ();
		
	}
	
	public function toArray($size='small'){
    	return array(
        	"name" => $this->name
        	//"chat_type" => $this->chat_type
        );
    }
	


	private function getMessagesFromDB(){
			$link = mysqli_connect("localhost", "fernando13", "");
		if($link!=false)
		{
			$db_selected = mysqli_select_db($link,"c9");
			if($db_selected!=false)
			{
				$queryString = "SELECT id,user_id,content,creation_date FROM MESSAGE WHERE MESSAGE.Chat_Timeline_Id = ".$this->id;
				$result = mysqli_query($link,$queryString);
				while($row = mysqli_fetch_object($result))
				{
					$message = new ChatMessage($row->id, $row->creation_date, $row->content, $row->user_id);
					array_push($this->messages, $message);
				}
			}
		}
	}
	
	private function getUsersFromDB(){
			$link = mysqli_connect("localhost", "fernando13", "");
		if($link!=false)
		{
			$db_selected = mysqli_select_db($link,"c9");
			if($db_selected!=false)
			{
				$queryString = "SELECT USER.id, username, email FROM USER, USER_CHAT_TIMELINE WHERE USER.id = USER_CHAT_TIMELINE.USER_ID AND USER_CHAT_TIMELINE.CHAT_TIMELINE_ID = ".$this->id;;
				$result = mysqli_query($link,$queryString);
				while($row = mysqli_fetch_object($result))
				{
					$user = new ChatUser($row->id, $row->username,$row->email);
					array_push($this->members, $user);
					
				}
			}
		}
	}




	public function select($ChatTimelineId)
	{
		$link = mysqli_connect("localhost", "fernando13", "");
		if($link!=false)
		{
			$db_selected = mysqli_select_db($link,"c9");
			if($db_selected!=false)
			{
				$queryString = "SELECT id, name, chat_type, creation_date FROM CHAT_TIMELINE WHERE CHAT_TIMELINE.id =".$ChatTimelineId;
				$result = mysqli_query($link,$queryString);
				if(mysqli_num_rows($result)==1)
				{
					$row = mysqli_fetch_object($result);
					$this->id = $row->id;
					$this->timestamp = $row->creation_date;
					$this->name = $row->name;
					$this->getMessagesFromDB();
					$this->getUsersFromDB();
					
					return $this;
				}
				else
				{
					die('Timeline not found');
				}
			}
			
			mysqli_close($link);
		}
		
		return null;
	}
	
	
}