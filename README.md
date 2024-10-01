**Fighter Aircraft Status System 🛦⏲🔋**

A fighter aircraft status system that operates both as a web and desktop app project that I've developed assigned by OBSS Teknoloji

**Description**

This is a React web based app that I've developed which also has an ".exe" version as a desktop app converted using Electron.
The app contains an airplane svg image, a battery, a speedometer and utility buttons. It retrieves real-time data from a WebSocket connection in the server side of the project that was provided me by OBSS Teknoloji
and displays the real-time direction, fuel and velocity status of the fighter aircraft visually all of them retrieved from the WebSocket broadcast. The start button initializes the WebSocket broadcasting and stop
terminates it. The fuel display changes its visual behaviour according to its fullness rate(changes to yellow below 50%, red below 25% and blinks starting at 20%). Unfortunately the app is not fully responsive and
might behave oddly on different aspects of its visual representation and has its optimal view as a fullscreen desktop app.

**Components**

  Plane

Plane is an svg image that rotates according to the data that's being provided by the WebSocket broadcast. The rotation is done using CSS. `planeAngle` is a `useState` hook that holds the real-time angle data and updates
itself in a `useEffect` hook. The rotation is added in the HTML markup of the component as a `style` property using CSS property of `transform:` ``rotate(${planeAngle}deg)``.

  Battery

Battery itself is only the empty battery svg image and it contains four CSS green rectangle `div` elements stacked on top of each other as a `column` oriented `flex`. Fuel information is held by the `planeBattery` `useState`
hook and just like Plane's angle data it is updated in a `useEffect` hook. It also has a `updateBatterySegments` function that handles the segment behaviour using `if`-`else` blocks and CSS `style` properties. Each
of the segments have the CSS class of `battery-segment` and their behaviour is determined by a CSS `transition` of their height attribute. I also created a `blinking` class that contains an infinite CSS `animation` namely
*blink*. It changes the element's `opacity` oscillating between 1 and 0 and `updateBatterySegments` function adds/removes the class accordingly.

  Speedometer

Speedometer consists of two svg images; an arrow and a circle. They are positioned on top of each other and the component handles the arrow's rotation according to the `speedometerAngle` `useState` hook. There is also
an additional `useState` hook of `setPlaneSpeed` which holds the instantaneous velocity data of the plane broadcasted by the WebSocket. Arrow rotation logic is a basic ratio equation where the plane velocity is between
0-100 *km/h* and the arrow would rotate between -90 and 90 *degrees* between the two ends of the circle so the angle would be equal to *((speed * 180)/100) - 90*.

  Utility Buttons

This is the components that basically checks whether the broadcast is active or not and connects/disconnects the app from the WebSocket accordingly.

**Preview**

![ezgif-5-a27c4b90ea](https://github.com/user-attachments/assets/cd77ec98-892c-4270-9e56-88b83a35dfe3)


**How To Run**

- Start the backend by navigating the *server* folder and using `npm run start`
- (Build the app in client using `npm run build`)
- Run the app in client using `npm start`
