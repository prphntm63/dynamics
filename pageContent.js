const email_form_html = `
  <div style='width:100%;text-align:center;'>Get In Touch</div>
  <div style='width:100%;margin:10px;text-align:right;'>
    <label for='contactName'>Name:</label>
    <input type='text' id='contactName' name='contactName' />
    <br>
    <br>
    <label for='contactMail'>Email:</label>
    <input type='email' id='contactMail' name='contactMail' />
    <br>
    <br>
    <label for='contactPhone'>Phone:</label>
    <input type='tel' id='contactPhone' name='contactPhone' />
    <br>
    <br>
    <label for='contactMsg'>Message:</label>
    <textarea rows=8 id='contactMsg' name='contactMsg' /></textarea>
  </div>
`

function submitForm() {
  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: "POST",
    body: JSON.stringify({
      "lib_version": "2.4.1",
      "user_id": "user_G351SbNM2Y0bWfebUkR4o",
      "service_id": "gmail",
      "template_id": "template_gy3HrNKm",
      "template_params": {
        contactMail: document.getElementById('contactMail').value,
        contactName: document.getElementById('contactName').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactMsg: document.getElementById('contactMsg').value,
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.status === 200) {
      document.getElementById('formSubmitButton').style.visibility = 'hidden'
      document.getElementById('messageText').innerHTML = "Your message has been sent! <br><br>I'll get back to you when I can :)"
    } else {
      document.getElementById('formSubmitButton').style.visibility = 'hidden'
      document.getElementById('messageText').innerHTML = "There was an issue sending your message :( <br><br>Maybe try again later?<br><br>Or if it's urgent, reach out directly to <a href='mailto:matt@westwick.dev'>matt@westwick.dev</a>"
    }
  })
}

function renderHtmlInTargetScreen(screenId, innerHtml, position="middle") {
  const boundingBoxWidth = 0.76*parseInt(LEVEL.constants.windowWidth)
  const boundingBoxOffset = (screenId * LEVEL.constants.windowWidth) + 0.12*boundingBoxWidth

  const targetDiv = document.createElement("div")

  targetDiv.innerHTML = innerHtml
  
  targetDiv.classList.add("titleText", "boundingBox")
  targetDiv.style.width = boundingBoxWidth + 'px'
  targetDiv.style.left = boundingBoxOffset + 'px'

  if (position === "bottom") {
    targetDiv.style.height = "100%"
    targetDiv.style.justifyContent = "flex-end"
    targetDiv.style.marginTop = '0px'
  } else if (position === "top") {
    targetDiv.style.marginTop = '0px'
  } else if (typeof(position) === 'number') {
    targetDiv.style.marginTop = `${position}vh`
  } 

  document.getElementById('level-container').appendChild(targetDiv)
}

function generateMainLogoContent (){
  return `
  <image src="images/super.png" style="max-width:40%;"/>
  <image src="images/matt_world.png" />
  `
}

function generateBioTitleContent (){
  return `
  <image src="images/about_me.png" />
  <span style="margin-top:15px;cursor:pointer;">
    ( Click the 
    <img 
      width="16" 
      height="16" 
      src="textures/message_box.png" 
      onclick="obstacles.find(obstacle => obstacle.screenId === 1)?.activate()"
    /> 
    to learn more! )
  </span>
  `
}

function generateAboutMeObstacles (obstaclesList, screenId = 1) {
  const boundingBoxWidth = 25*Math.round((0.4*parseInt(LEVEL.constants.windowWidth))/25)
  const boundingBoxOffset = 25*Math.round(((screenId * LEVEL.constants.windowWidth) + 0.25*boundingBoxWidth)/25)
  const windowHeight = LEVEL.constants.scaleFactor * window.innerHeight

  obstaclesList.push({
    type: 'platform2',
    collision: 'top',
    left: boundingBoxOffset + 0.3*boundingBoxWidth,
    bottom: 0,
    height: 0.2*windowHeight,
    width: 0.6*boundingBoxWidth
  }, 
  {
    type: 'platform',
    collision: 'top',
    left: boundingBoxOffset + 0.7*boundingBoxWidth,
    bottom: 0,
    height: 0.35*windowHeight,
    width: 0.8*boundingBoxWidth
  }, 
  {
    type: 'github',
    collision: 'all',
    left: boundingBoxOffset + boundingBoxWidth,
    bottom: 0.35*windowHeight + 192,
    height: 60,
    width: 60,
    html: `<a title="Github" target="_blank" rel="noopener noreferrer" href="https://github.com/prphntm63"><div style="height:100%;width:100%;"></div></a>`,
    activate: () => {
      setTimeout(() => {
        const confirmNav = window.confirm("Do you want to open my Github profile in a new tab?")
        if (confirmNav) {
          window.open("https://github.com/prphntm63", '_blank').focus()
        }
        INPUT.keyEvents.resetKeys()
      }, 150)
    }
  },
  {
    type: 'linkedin',
    collision: 'all',
    left: boundingBoxOffset + boundingBoxWidth + 128,
    bottom: 0.35*windowHeight + 192,
    height: 60,
    width: 60,
    html: `<a title="LinkedIn" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/mattwestwick/"><div style="height:100%;width:100%;"></div></a>`,
    activate: () => {
      setTimeout(() => {
        const confirmNav = window.confirm("Do you want to open my LinkedIn profile in a new tab?")
        if (confirmNav) {
          window.open("https://www.linkedin.com/in/mattwestwick", '_blank').focus()
        }
        INPUT.keyEvents.resetKeys()
      }, 150)
    }
  },
  {
    type: 'mail',
    collision: 'all',
    left: boundingBoxOffset + boundingBoxWidth + 256,
    bottom: 0.35*windowHeight + 192,
    height: 60,
    width: 60,
    html: `
      <div 
        title="Contact"
        style="height:100%;width:100%;cursor:pointer;" 
        onclick="(function(){
          document.getElementById('messageOverlay').classList.add('active');
          document.getElementById('messageBox').classList.add('active');
          document.getElementById('messageText').innerHTML = \`${email_form_html}\`;
          (() => {window.INPUT.keys.allowInput = false})();
          document.getElementById('formSubmitButton').style.visibility = 'visible';
        })();return false;"
      >
      </div>
    `,
    activate: () => {
      document.getElementById('messageOverlay').classList.add('active')
      document.getElementById('messageBox').classList.add('active')
      document.getElementById('messageText').innerHTML = email_form_html
      window.INPUT.keys.allowInput = false
      document.getElementById('formSubmitButton').style.visibility = 'visible';
    }
  },
  {
    type: 'block',
    collision: 'all',
    left: boundingBoxOffset + 0.35*boundingBoxWidth,
    bottom: 0.2*windowHeight + 192,
    height: 64,
    width: 64
  }, 
  {
    type: 'block',
    collision: 'all',
    left: boundingBoxOffset + 0.35*boundingBoxWidth + 128,
    bottom: 0.2*windowHeight + 192,
    height: 64,
    width: 64
  })
}

function generateBrewingTitleContent (){
  return `
  <image src="images/brewing.png" />
  <span style="margin-top:15px;cursor:pointer;">
    ( Click the 
    <img 
      width="16" 
      height="16" 
      src="textures/message_box.png" 
      onclick="obstacles.find(obstacle => obstacle.screenId === 2)?.activate()"
    /> 
    to learn more! )
  </span>
  `
}

function generateCodeTitleContent (){
  return `
  <image src="images/code_portfolio.png" />
  <span style="margin-top:15px;cursor:pointer;">
    ( Click the 
    <img 
      width="16" 
      height="16" 
      src="textures/message_box.png" 
      onclick="obstacles.find(obstacle => obstacle.screenId === 3)?.activate()"
    /> 
    to learn more! )
  </span>
  `
}

function generateMessageBox (obstaclesList, screenId = 1, text=""){
  const totalOffset = 25*Math.round(((screenId * LEVEL.constants.windowWidth) + 0.5*LEVEL.constants.windowWidth - 64)/25)
  const windowHeight = window.innerHeight

  obstaclesList.push({
    type: 'messagebox',
    collision: 'all',
    left : totalOffset,
    bottom: 25*Math.round(0.2*windowHeight/25),
    height: 64,
    width: 64,
    html: `
      <div 
        style="height:100%;width:100%;cursor:pointer;" 
        onclick="(function(){
          document.getElementById('messageOverlay').classList.add('active');
          document.getElementById('messageBox').classList.add('active');
          document.getElementById('messageText').innerHTML = '${text}';
          (() => {window.INPUT.keys.allowInput = false})();
        })();return false;"
      >
      </div>
    `,
    activate: () => {
      document.getElementById('messageOverlay').classList.add('active')
      document.getElementById('messageBox').classList.add('active')
      document.getElementById('messageText').innerHTML = text
      window.INPUT.keys.allowInput = false
    },
    screenId
  })
}

function doubleToHex(d) {
  // Converts decimal in string to hex in string
  let hexText = d.toString(16);
  const point = hexText.indexOf(".");
  if (point != -1) {
    hexText = hexText.substring(0, point);
  }
  while (hexText.length < 2) {
    hexText = "0" + hexText;
  }
  return hexText;
}

function srm_to_hex(srm) {
  // Returns an RGB value based on SRM
  let r = 0,
    g = 0,
    b = 0;

  if (srm >= 0 && srm <= 1) {
    r = 240;
    g = 239;
    b = 181;
  } else if (srm > 1 && srm <= 2) {
    r = 233;
    g = 215;
    b = 108;
  } else if (srm > 2) {
    // Set red decimal
    if (srm < 70.6843) {
      r = 243.8327 - 6.404 * srm + 0.0453 * srm * srm;
    } else {
      r = 17.5014;
    }
    // Set green decimal
    if (srm < 35.0674) {
      g = 230.929 - 12.484 * srm + 0.178 * srm * srm;
    } else {
      g = 12.0382;
    }
    // Set blue decimal
    if (srm < 4) {
      b = -54 * srm + 216;
    } else if (srm >= 4 && srm < 7) {
      b = 0;
    } else if (srm >= 7 && srm < 9) {
      b = 13 * srm - 91;
    } else if (srm >= 9 && srm < 13) {
      b = 2 * srm + 8;
    } else if (srm >= 13 && srm < 17) {
      b = -1.5 * srm + 53.5;
    } else if (srm >= 17 && srm < 22) {
      b = 0.6 * srm + 17.8;
    } else if (srm >= 22 && srm < 27) {
      b = -2.2 * srm + 79.4;
    } else if (srm >= 27 && srm < 34) {
      b = -0.4285 * srm + 31.5714;
    } else {
      b = 17;
    }
  }
  const red = doubleToHex(r);
  const green = doubleToHex(g);
  const blue = doubleToHex(b);
  return "#" + red + green + blue;
};

function renderBrewingScreenContent (obstaclesList){
  const boundingBoxWidth = 25*Math.round((0.6*parseInt(LEVEL.constants.windowWidth))/25)
  const boundingBoxOffset = 25*Math.round(((2 * LEVEL.constants.windowWidth) + 0.25*boundingBoxWidth)/25)
  const windowHeight = LEVEL.constants.scaleFactor * window.innerHeight
  const minHeight = 25*Math.round(0.3*windowHeight/25)
  const maxHeight = 0.65*windowHeight
  const elementWidth = 250
  const elementHeight = 125

  const taps = ['1', '2', '3', '4', '5', '6']
  const positions = [
    [boundingBoxOffset, (boundingBoxOffset+0.5*(boundingBoxWidth-elementWidth)), (boundingBoxOffset+boundingBoxWidth-elementWidth)],
    [maxHeight - elementHeight, minHeight] 
  ]

  taps.forEach(tap => {
    obstaclesList.push({
        type: 'platform',
        collision: 'top',
        left : positions[0][(tap-1)%3] + (tap > 3 ? 64 : 0),
        bottom: positions[1][tap > 3 ? 1 : 0],
        height: elementHeight,
        width: elementWidth,
        html: `<div id=tap-${tap} style="height:100%;"></div>`
    })
  })


  const generateUrl = (brewId) => `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-e5f68f7c-ddc5-4ed5-b80b-7091a3d11d89/express/proxy_request${brewId ? "?brewid=" + brewId : ""}`

  fetch(generateUrl())
    .then(res => res.json())
    .then(async res => {
      const recipes = await Promise.all(
        res.brewsessions.map(session => fetch(generateUrl(session.recipeid))
          .then(res => res.json())
          .then(res => res.recipes[0])
        )
      )

      const tapdata = {}

      taps.forEach(tap => {
        const session = res.brewsessions.find(session => session.batchcode == tap)
        if (!session) {
          tapdata[tap] = null
          return
        }
        const recipe = recipes.find(recipe => recipe.id == session.recipeid)

        tapdata[tap] = {
          session,
          recipe
        }
      })

      return tapdata
    })
    .then(taps => {
      Object.keys(taps).forEach(tapId => {
        const tap = taps[tapId]
        let html = ''

        if (!tap) {
          // html = "<span>Empty :(</span>"
          html = `
          <div style="display:flex;height:100%;">
            <div style="padding: 10px 15px;">
              <div class="tap-text">${tapId}</div>
            </div>
            <div style="display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div class="tap-title-text">Empty :(</div>
                  <span class="tap-style-text">Check back soon!</span>
                </div>
            </div>
          </div>
          `
        } else {
          html = `
          <a target="_blank" rel="noopener noreferrer" href="https://www.brewersfriend.com/homebrew/recipe/view/${tap.recipe.id}">
            <div style="display:flex;height:100%;background-color:${srm_to_hex(Number(tap.recipe.srmmorey))};color:${Number(tap.recipe.srmmorey)>10 ? '#fff' : '#000'}">
              <div style="padding: 10px 15px;">
                <div class="tap-text">${tapId}</div>
              </div>
              <div style="display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div class="tap-title-text">${tap.recipe.title}</div>
                  <span class="tap-style-text">${tap.recipe.stylename}</span>
                </div>
                <div>
                  <div class="stat-block-wrapper">
                    <div class="stat-block">
                      <div class="stat-label">ABV</div>
                      <div class="stat-value">${parseFloat(tap.recipe.abv).toFixed(1)}</div>
                    </div>
                    <div class="stat-block">
                      <div class="stat-label">OG</div>
                      <div class="stat-value">${tap.recipe.og}</div>
                    </div>
                    <div class="stat-block">
                      <div class="stat-label">FG</div>
                      <div class="stat-value">${tap.recipe.fg}</div>
                    </div>
                    <div class="stat-block">
                      <div class="stat-label">SRM</div>
                      <div class="stat-value">${parseInt(tap.recipe.srmmorey)}</div>
                    </div>
                    <div class="stat-block">
                      <div class="stat-label">IBU</div>
                      <div class="stat-value">${parseInt(tap.recipe.ibutinseth)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          `
        }        

        document.getElementById(`tap-${tapId}`).innerHTML = html
      })
    })
}

function renderCodeScreenContent (obstaclesList){
  const boundingBoxWidth = 25*Math.round((0.6*parseInt(LEVEL.constants.windowWidth))/25)
  const boundingBoxOffset = 25*Math.round(((3 * LEVEL.constants.windowWidth) + 0.25*boundingBoxWidth)/25)
  const windowHeight = LEVEL.constants.scaleFactor * window.innerHeight
  const elementWidth = 175
  const elementHeight = 300

  const repos = [
    {
      name: "BJCP Scoresheets",
      source: "https://github.com/CIA-Homebrew/BJCP-Scoresheet",
      website: "https://scoresheets.org",
      logo: "https://github.com/CIA-Homebrew/BJCP-Scoresheet/blob/master/public/images/bjcp-scoresheets-logo-only.png?raw=true",
      description: "Application for digitally creating, organizing, and distributing scoresheets for homebrewing competitions",
      color: "#049BDA"
    },
    {
      name: "Mashboard",
      source: "https://github.com/prphntm63/mashboard",
      website: "https://github.com/prphntm63/mashboard",
      logo: "https://raw.githubusercontent.com/prphntm63/mashboard/master/client/public/favicon.ico",
      description: "Full-stack application for realtime monitoring and control of industrial brewing and distillation equipment",
      color: "#ED6C04"
    },
    {
      name: "Headmaster",
      source: "https://github.com/prphntm63/headmaster2",
      website: "https://github.com/prphntm63/headmaster2",
      logo: "https://github.com/prphntm63/headmaster2/blob/master/client/public/images/headmaster-logo.png?raw=true",
      description: "Full-stack application for software bootcamp student management utilizing Github profiles",
      color: "#43B233"
    },
    {
      name: "Dynamics",
      source: "https://github.com/prphntm63/dynamics",
      website: "https://matt.westwick.dev",
      logo: "images/android-chrome-512x512.png",
      description: "Pure Javascript personal portfolio site with a retro video game flair",
      color: "#e31b04"
    },
  ]
  const positions = [
    boundingBoxOffset, 
    (boundingBoxOffset+0.33*(boundingBoxWidth-elementWidth)), 
    (boundingBoxOffset+0.66*(boundingBoxWidth-elementWidth))+63, 
    (boundingBoxOffset+boundingBoxWidth-elementWidth)+63
  ]

  repos.forEach((repo, idx) => {
    obstaclesList.push({
        type: 'platform',
        collision: 'top',
        left : positions[idx],
        bottom: 25*Math.round(0.35*windowHeight/25),
        height: elementHeight,
        width: elementWidth,
        html: `
          <div id=repo-${idx} style="height:100%;">
            <div style="display:flex;height:100%;background-color:${repo.color || "#333"}">
              <div class="repo-content-wrapper">
                <div class="repo-logo-wrapper">
                  <img width="85px" height="85px" src="${repo.logo}" alt="repo logo">
                </div>
                <div class="repo-text">
                  <div class="repo-title-text">${repo.name}</div>
                  <span class="repo-style-text">${repo.description}</span>
                </div>
                <div style="width: 100%">
                  <div class="links-block-wrapper">
                    <div class="link-block">
                      <a target="_blank" rel="noopener noreferrer" href="${repo.source}" title="View Source">
                        <img width="32px" height="32px" src="images/code.svg" alt="source code">
                      </a>
                    </div>
                    <div class="link-block">
                      <a target="_blank" rel="noopener noreferrer" href="${repo.website}" title="Visit Website">
                        <img width="32px" height="32px" src="images/web.svg" alt="website">
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
    })
  })
}

function generateGoalposts (){
  const offset = (LEVEL.constants.screens * LEVEL.constants.windowWidth) + 200
  LEVEL.variables.goalpost = {
    barPosition: 0,
    barBroken: false,
  }

  const goalpostDiv = document.createElement("div")
  goalpostDiv.classList.add("goalpost")
  goalpostDiv.style.left = offset + "px"
  goalpostDiv.style.bottom = "0px"

  goalpostDiv.innerHTML = `
  <img id="goalpost" src="textures/goalposts.png" style="height:576px;"/>
  <img id="goalBar" src="textures/goalposts_bar.png" />
  `
  
  document.getElementById('level-container').appendChild(goalpostDiv)
}