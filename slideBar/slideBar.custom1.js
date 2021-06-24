var menuTop = document.getElementById( 'cbp-spmenu-s3' ),
			
				showTop = document.getElementById( 'showTop' ),
				
				body = document.body;

			showTop.onclick = function() {
				classie.toggle( this, 'active' );
				classie.toggle( menuTop, 'cbp-spmenu-open' );
				
			};
