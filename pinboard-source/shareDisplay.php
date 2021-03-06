<?php 
    if($_GET["email"] == null) header("location: ./index.html");

    function getShare() {
        $email = $_GET["email"];
        $url = 'http://evanclosson.space/pinboard/shareDisplay.php?email='.$email;
        return $url;
    }
    $encodeurl = urlencode( getShare() );

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <!--Possible todo: Create it so users email or facebook name shows up on the title. Eg: Evan's Pinboard-->
  <title>Pinboard!</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="theme-color" content="#00ACDB">
	<!--link rel="stylesheet/less" href="less/bootstrap.less" type="text/css" /-->
	<!--link rel="stylesheet/less" href="less/responsive.less" type="text/css" /-->
	<!--script src="js/less-1.3.3.min.js"></script-->
	<!--append ‘#!watch’ to the browser URL, then refresh the page. -->
	
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
  <![endif]-->

  <!-- Fav and touch icons -->
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/apple-touch-icon-144-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/apple-touch-icon-114-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/apple-touch-icon-72-precomposed.png">
  <link rel="apple-touch-icon-precomposed" href="img/apple-touch-icon-57-precomposed.png">
  <link rel="shortcut icon" href="img/favicon.png">
  
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/scripts.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
    <script src="js/maps.js" ></script>
    <script src="js/share.js" ></script>
    
    <script>
         //Still needs work. Does scroll but needs heavy mod
       /* $(function () {
        $('.panel-group').on('shown.bs.collapse', function (e) {
            var offset = $('.panel.panel-default > .panel-collapse.in').offset();
            if(offset) {
                $('#inner').animate({
                    scrollTop: $('.panel-collapse.in').siblings('.panel-heading').offset().top
                }, 500); 
            }
        });
        });*/
    
        //Help function for simple popup!
        function deselect(e) {
          $('.pop').slideFadeToggle(function() {
            e.removeClass('selected');
          });    
        }
        $(function() {
          $('#help').on('click', function() {
            if($(this).hasClass('selected')) {
              deselect($(this));               
            } else {
              $(this).addClass('selected');
              $('.pop').slideFadeToggle();
            }
            return false;
          });

          $('.close').on('click', function() {
            deselect($('#help'));
            return false;
          });
        });

        $.fn.slideFadeToggle = function(easing, callback) {
          return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
        };
    </script>
</head>


<body>
    <!-- Will move this after, just testing to get sharing page to facebook.-->
    
<div class="container">
	<div class="row clearfix">
		<div class="col-md-12 column">

			<nav class="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
				<div class="navbar-header">
					 <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button> <a class="navbar-brand" href="./display.php">Pinboard</a>
				</div>
				
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li class="active">
							<a href="./display.php">Home</a>
						</li>	
			 <li  id="facebookShare">
                            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $encodeurl; ?>" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=<?php echo $encodeurl; ?>', 'newwindow', 'width=600, height=200'); return false;" id="share" style="background-color: #3b5998; color: white;">Share on Facebook</a>
                        </li>
			   <li  id="googleShare">
				<a href="https://plus.google.com/share?url=<?php echo $encodeurl; ?>" onclick="javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;" style="background-color: #dd4b39; color: white;">Share on Google+</a>
                        </li>
	
	
					</ul>
					<ul class="nav navbar-nav navbar-right">
						<li>
							<a href="./index.html">Login</a>
						</li>
					</ul>
				</div>
				
			</nav>
			<br/>
			<div class="page-header">
				<h1>
					Pinboard <small>Maps for the travelling soul!</small>
				</h1>
			</div>
		</div>
	</div>
	<span class="label label-default">Markers</span>
	<div class="row clearfix" id="rowmap">
		<div class="col-md-3 column">
			<div class="inner_marker">

				<div class="panel-group" id="panel-66082">
				
				<?php
				// get the q parameter from URL
				$servername = "localhost";
				$username = "root";
				$dbname = "pinboard";
				$password = "qwertyhero";
				//$servername = "lovett.usask.ca";
				//$username = "cmpt350_amm215";
				//$dbname = "cmpt350_amm215";
				//$password = "5eukmjjz9w";
				$email = $_GET["email"];
				//create connection to the database
				 try
				 {
					$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
					$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					//select all the pin information for this user
					$sql = "SELECT * FROM pin_table WHERE email = '".$email."';";
					$result = $conn->query($sql);
					$fetch = $result->fetchAll();
					$markers = array(); 
					foreach($fetch as $row)
					{		
						//build up a set of associative arrays that are representative of marker data
						$markerRow = array(
							"id" => (int)$row["id"],
							"title" => $row["title"],
							"address" => $row["address"],
							"lat" => (double)$row["lat"],
							"lng" => (double)$row["lng"],
							"description" => $row["description"],
							"isVisited" => (bool)$row["isVisited"]
						);
						array_push($markers, $markerRow);
					    $visited;
						if($row["isVisited"] == true)
						{
							 $visited = "Visited";
						}
						else
						{
							$visited = "Not Yet Visited";
						}
					
						
						// the END; MUST be on its own line, and be right at the start of the line without tabs, dont try to reformat or you will risk my wrath - Andrew
						echo <<<END
						<div class="panel panel-default">
						<div class="panel-heading">
							 <a class="panel-title collapsed" data-toggle="collapse" data-parent="#panel-66082" onclick='map.setCenter( new google.maps.LatLng($row[lat], $row[lng])); map.setZoom(7);' href="#panel-element-$row[id]">$row[title]</a>
						</div>
						<div id="panel-element-$row[id]" class="panel-collapse collapse">
							<div class="panel-body">
								<strong>Address:</strong> $row[address] <br>
								<strong>Description: </strong> $row[description]<br>
								<strong>Status: </strong> $visited<br>
							</div>
						</div>
					</div>				
END;
					}
					echo "<script> allMarkers = ".json_encode($markers)."</script>";
				}
				catch(PDOException $e)
				{
					echo "failz for DB";
				}
				?>
					
				</div>
			</div>
			<!-- This is the code for the New Pin Form -->
			<div id="newPinForm" class="hidden">
				<form action="#" id="form" method="post" name="form" onsubmit="return false">
				<h3>New Pin Form</h3>
				<p id="pinNameError" name="pinNameError" style="color: red;" type="text" class="hidden">*A name is required.</p>
				<input id="pinName" name="pinName" placeholder="Pin Name" type="text" class="form-control"><br>
				<input id="pinAddress" name="pinAddress" placeholder="Pin Address (Optional)" type="text" class="form-control"><br>
				<textarea id="pinDescription" name="pinDescription" placeholder="Enter A Description For Your New Pin!" style="resize:none;" class="form-control"></textarea><br>
				<input type="checkbox" id="pinIsVisited" name="visitedCheck" value="true"> Have you been here before?<br><br/>
				</form>
                <button type="submit" class="btn btn-primary btn-med" id="submit" onclick ="submitPin();">Send</button>
			</div>
		</div>
		<div class="col-md-9 column">
			 <span class="label label-default">Map</span> 
            <div class="messagepop pop">
                <div class="page-header"> <h2>Instructions</h2><br> </div>
                <p>Left-click (or just tap the screen) anywhere on the map to place a marker!</p>
                <p>To zoom in, scroll the mouse wheel! (Mobile users, use pinch zoom)!</p>
                <p>Wish to delete a pin? Just tap the X!</p>
                <p>Click on the marker on the left side to view that marker, it will automatically move you to that marker!</p>
                <p>While you click on the marker, you can update your pin by a press of the button!</p>
                <p>Wish to close this menu? Click the X or just click Help again!</p>
                <a class="close" href="/"><span class="glyphicon glyphicon-remove"></span></a>
            </div>
				<div id="map-canvas" class="circle-text"></div>
		</div>

	</div>
</div>
</body>
</html>
