(function(){
  var tiers=[
    {min:90,cls:'tier-elite',label:'Elite'},
    {min:80,cls:'tier-strong',label:'Strong'},
    {min:70,cls:'tier-balanced',label:'Balanced'},
    {min:60,cls:'tier-modest',label:'Modest'},
    {min:0,cls:'tier-minimal',label:'Minimal'}
  ];

  var tierDescs={
    overall:{
      'Elite':'Top-tier performance in its class',
      'Strong':'Excellent all-round capability',
      'Balanced':'Solid and dependable',
      'Modest':'Functional with clear limitations',
      'Minimal':'Entry-level, limited ceiling'
    },
    power:{
      'Elite':'Exceptional pace and depth',
      'Strong':'High-end power for big shots',
      'Balanced':'Adequate power for most rallies',
      'Modest':'Enough for baseline exchanges',
      'Minimal':'Low power output'
    },
    control:{
      'Elite':'Surgical precision and placement',
      'Strong':'Reliable direction and depth',
      'Balanced':'Consistent on most shots',
      'Modest':'Some inconsistency under pressure',
      'Minimal':'Hard to direct precisely'
    },
    touch:{
      'Elite':'Outstanding feel and finesse',
      'Strong':'High sensitivity for drops and volleys',
      'Balanced':'Decent touch for most players',
      'Modest':'Limited feedback from the frame',
      'Minimal':'Little touch or dwell time'
    }
  };

  function getTier(score){
    for(var i=0;i<tiers.length;i++){
      if(score>=tiers[i].min) return tiers[i];
    }
    return tiers[tiers.length-1];
  }

  window.getTier=getTier;
  window.tiers=tiers;

  function badgeHTML(score){
    var t=getTier(score);
    return '<span class="tier-badge '+t.cls+'">'+t.label+'</span>';
  }

  function barBadgeHTML(score){
    var t=getTier(score);
    return '<span class="tier-badge bar-tier '+t.cls+'">'+t.label+'</span>';
  }

  function buildHowScore(){
    var cats=['overall','power','control','touch'];
    var catLabels={overall:'Overall',power:'Power',control:'Control',touch:'Touch'};
    var rows=tiers.map(function(t){
      return '<div class="hs-tier-row"><span class="tier-badge '+t.cls+'">'+t.label+'</span><span class="hs-desc">'+tierDescs.overall[t.label]+'</span></div>';
    }).join('');
    return '<div class="how-score-box" id="howScoreBox">'+
      '<button class="how-score-toggle" aria-expanded="false" onclick="'+
        'var b=document.getElementById(\'howScoreBox\');'+
        'var open=b.classList.toggle(\'open\');'+
        'this.setAttribute(\'aria-expanded\',open)'+
      '">'+
        '<span class="hst-label">How we score</span>'+
        '<span class="hst-arrow">&#9660;</span>'+
      '</button>'+
      '<div class="how-score-body">'+
        '<p style="font-size:.8rem;color:#666;margin-bottom:10px;line-height:1.5">Each racket is tested across Power, Control, and Touch. The Overall score is a weighted composite. Tiers are assigned per category:</p>'+
        '<div class="hs-grid">'+rows+'</div>'+
      '</div>'+
    '</div>';
  }

  document.addEventListener('DOMContentLoaded',function(){
    // Inject tier badge after .score-label on racket review pages
    var scoreLabel=document.querySelector('.score-label');
    if(scoreLabel){
      var scoreBig=document.querySelector('.score-big');
      if(scoreBig){
        var overall=parseInt(scoreBig.textContent,10);
        if(!isNaN(overall)){
          scoreLabel.insertAdjacentHTML('afterend','<div class="overall-tier-badge">'+badgeHTML(overall)+'</div>');
        }
      }
    }

    // Inject tier badges after each .bar-val on racket review pages
    document.querySelectorAll('.bar-val').forEach(function(el){
      var val=parseInt(el.textContent,10);
      if(!isNaN(val)){
        el.insertAdjacentHTML('afterend',barBadgeHTML(val));
      }
    });

    // Inject "How we score" after first .review-section in .review-main
    var reviewMain=document.querySelector('.review-main');
    if(reviewMain){
      var firstSection=reviewMain.querySelector('.review-section');
      if(firstSection){
        firstSection.insertAdjacentHTML('afterend',buildHowScore());
      }
    }

    // Blog pages: inject tier badge inside .score-badge (after the Score label)
    document.querySelectorAll('.score-badge').forEach(function(el){
      var val=parseInt(el.textContent,10);
      if(!isNaN(val)){
        el.insertAdjacentHTML('beforeend','<span class="tier-badge '+getTier(val).cls+'" style="margin-left:0;font-size:.5rem;margin-top:3px">'+getTier(val).label+'</span>');
      }
    });

    // Blog pages: inject tier badge after each .sbi-val
    document.querySelectorAll('.sbi-val').forEach(function(el){
      var val=parseInt(el.textContent,10);
      if(!isNaN(val)){
        el.insertAdjacentHTML('afterend',badgeHTML(val));
      }
    });

    // Blog pages: add tier badge after .ct-score cells in comparison tables
    document.querySelectorAll('.ct-score').forEach(function(el){
      var val=parseInt(el.textContent,10);
      if(!isNaN(val)){
        el.insertAdjacentHTML('afterend',badgeHTML(val));
      }
    });
  });
})();
