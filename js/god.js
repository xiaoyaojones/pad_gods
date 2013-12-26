var GODSSERIES = 0;

GODSSERIES = GODS.length;

var eClick = ('ontouchstart' in window) ? 'touchstart' : 'click';

var $GodBox = $('#GodBox'),
	sHtml = '';

for (var i = 0; i < GODSSERIES; i++) {
	sHtml += '<div class="box">'
	sHtml += '<strong class="name">' + GODS[i].series + '</strong><ul>'
	$.each(GODS[i].property,function (j) {
		if (!!this.num) {
			sHtml += '<li><img src="images/0' + (j+1) + '/' + this.num + 'i_g.png" data-series="' + (j+1) + '" data-num="' + this.num + '" data-status="0" data-evo="' + this.evolution + '" data-u-evo="' + this.u_evolution + '" data-n-u-evo="0"></li>'
		}else{
			sHtml += '<li>&nbsp;</li>'
		};
		
	});
	sHtml += '</ul></div>';
};

$GodBox.html(sHtml);

var fTools = {
	changeImg : function (obj,s,num) {
		obj.attr('src','images/0' + s + '/' + num + 'i.png');
	},
	resetImg : function (obj,s,num) {
		obj.attr('src','images/0' + s + '/' + num + 'i_g.png');
	},
	setStatus : function (obj,name,data) {
		obj.attr('data-' + name,data);
	}
};


$GodBox.delegate('img',eClick,function (e) {
	var _this = $(this),
		_series = _this.attr('data-series'),//series
		_num = _this.attr('data-num'),//number
		_status = Math.floor(_this.attr('data-status')),//evolution status
		_evo = _this.attr('data-evo'),//evolution
		_uEvo = _this.attr('data-u-evo').split(','),//ultimate evolution
		_n_uEvo = Math.floor(_this.attr('data-n-u-evo'));//ultimate evolution status

	if (_status === 0) {//gray to light
		fTools.changeImg(_this,_series,_num);
		fTools.setStatus(_this,'status',1);
	};

	if (!!_evo && (_status === 1)) {//not evolution
		fTools.changeImg(_this,_series,_evo);
		fTools.setStatus(_this,'status',2);
	};

	if (_uEvo[0] === 'undefined' && (_status === 2)) {
		fTools.resetImg(_this,_series,_num)
		fTools.setStatus(_this,'status',0);
	}else{
		if (_n_uEvo !== _uEvo.length) {//whether ultimate
			if (!!_uEvo && (_status === 2)) {
				fTools.changeImg(_this,_series,_uEvo[_n_uEvo]);
				fTools.setStatus(_this,'n-u-evo',_n_uEvo + 1);
			};
		}else{
			fTools.resetImg(_this,_series,_num)
			fTools.setStatus(_this,'status',0);
			fTools.setStatus(_this,'n-u-evo',0);
		};	
	};

});

var $btn = $('#generate');

$btn.on(eClick,function (e) {
	html2canvas($('#container'), {
	    onrendered: function(canvas) {
	    	Canvas2Image.saveAsPNG(canvas);
	    }
	});
});

