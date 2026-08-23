<?php
function dbOpen() {
    // Localhost
    require_once("{$_SERVER['DOCUMENT_ROOT']}/db/dbaccess.php");
    
    // Server
    // include("../db/dbaccess.php");
    
    return $dbc;
}

function dbClose() {
    # Close database connection.
    if (isset($dbc)) {
      $dbc->close();
    }
}
  
function dbCount($tab) {
    $dbc = dbOpen();
    $q = "SELECT COUNT(*) FROM ".$tab;
    $r = $dbc->query($q);
    $row = mysqli_fetch_array($r, MYSQLI_ASSOC);  
    return $row['COUNT(*)'];
    dbClose();
}

function msgModal($msg, $title="Alert") { 
    $uniqueid = substr(uniqid(), 6);  
    ?>
    <div class="modal fade" id="<?=$uniqueid?>" style="display:block">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header py-2">
                    <h4 class="modal-title h4"><?=$title?></h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body py-3">
                    <?=$msg?>
                </div>
                <div class="modal-footer py-1">
                    <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
    <?php }

function confirmModal($msg, $trueURL, $falseURL='', $title='Confirm') { 
    $uniqueid = substr(uniqid(), 6);
    if($falseURL != '') $script = "location.href='$falseURL'";
    else $script = "closeModal('$uniqueid')";
    ?>
    <div class="modal modal-small" id="<?=$uniqueid?>" style="display:block">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modalTitle"><?=$title?></div>
                    <span class="close ms-auto" onclick="closeModal('<?=$uniqueid?>')">&times;</span>
                </div>
                <div class="modal-body">
                    <?=$msg?>
                </div>
                <div class="modal-footer py-1">
                    <button type="submit" class="button button-blue" name="confirmBtn" onclick="location.href='<?=$trueURL?>'">OK</button>
                    <button class="button button-red" id="modalCloseBottom" onclick="<?=$script?>">Cancel</button>
                </div>
            </div>
        </div>
    </div>
<?php }


?>