<?php
class Modal {
    // Properties
    public $message;
    public $trueURL;
    public $falseURL;
    public $title;  
    // Constructor
    function __construct($message, $title='', $trueURL = null, $falseURL = null) {
        $this->set("message", $message);
        if ($trueURL != null) $this->set("trueURL", $trueURL);
        if ($falseURL != null) $this->set("falseURL", $falseURL);
        if($title != '') $this->set("title", $title);
        else $this->set("title", "Alert");
    }
    // Methods
    public function __toString() {
        $message = $this->get("message");
        $title = $this->get("title");
        $trueURL = $this->get("trueURL");
        $falseURL = $this->get("falseURL");
        $buttons = '';
        if($trueURL == null) {
            $buttons = '<button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">OK</button>';
        }
        else if ($trueURL != null && $falseURL == null) {
            $buttons = <<<END
                <button type='button' class='btn btn-primary btn-sm' onclick="location.href='$trueURL'">Confirm</button>
                <button type='button' class='btn btn-danger btn-sm' data-bs-dismiss="modal">Cancel</button>
            END;
        }
        else if ($trueURL != null && $falseURL != null) {
            $buttons = <<<END
                <button type="button" class="btn btn-primary btn-sm" onclick="location.href='$trueURL'">Confirm</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="location.href='$falseURL'">Cancel</button>
        END;
        }
        
        $uniqueid = substr(uniqid(), 6);
        $modalToString = <<<END
        <div class="modal fade" id="$uniqueid">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header py-2">
                        <h4 class="modal-title h4">$title</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body py-3">
                        $message
                    </div>
                    <div class="modal-footer py-1">
                        $buttons
                    </div>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#$uniqueid">Open Modal</button>
        END;

        return $modalToString;
    }
    // Get and Set
    function set($param, $val = '') {
        if($val != '') $this->$param = $val;
        else $this->$param = $param;
    }
    function get($param) {
        if($this->$param) return $this->$param;
    }
}

$confirmModal = new Modal($msg, $title, $trueURL, $falseURL);
echo $confirmModal->__toString();
?>

<?php class Dropdown {
    public $link;
    public $linktext;
    function __construct($link, $linktext) {
        $this->set("link", $link);
        $this->set("linktext", $linktext);
        $html = <<<END
        <div class="w3-dropdown-hover">
            <button class="w3-button">Hover Over Me!</button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <a href="$this->$link" class="w3-bar-item w3-button">$this->$linktext</a>
            </div>
        </div>
        END;
    }
    // Getters and Setters
    function set($param, $val) {
        if($this->$param) $this->$param = $param;
    }
    function get($param) {
        if($this->$param) return $this->$param;
    }
} ?> 

<?php function nameDropdown() {
    $nameDropdown = new Dropdown("www.abc.com", "abc website");
    echo nameDropdown->get("link");
}

nameDropdown();
?>