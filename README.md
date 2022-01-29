Link to my WhiteBoard :- https://1218muskan.github.io/WhiteBoard/

Tech Stack Used : **HTML, CSS, JavaScript, Canavas API**

# WhiteBoard

A whiteboard is a powerful tool for us to express ideas and further could be developed to collaborate or even draw on a video stream. It can facilitate a professor during his/her lessons in delivering of knowledge to the students. It can be used by different users all over world to accomplish their task/work. Along with assisting individuals from different working culture, it can also be used as a fun element by children. They can paint their imagination on Whiteboard using different colour and shapes. 

<img src="https://cacoo.com/wp-app/uploads/2019/12/Cacoo-Online-Whiteboards-Blog.png" width="350" height="200" align = "center" />


## Introduction

Due to outbreak of covid virus in 2020, education sector has also suffered a lot. It has gone through a sudden shift from offline classroom to virtual classroom, from blackboard to whiteboard, from hard copies to e-notes and a lot more. 

In lockdown, an online whiteboard has supported youngers in making learning process more fun, increasing their productivity and creativity to next level. Understanding all the functions and features of a whiteboard I developed my own board which can serve individual with all these features. 
The main technology behind the working of my Whiteboard is JavaScript and Canvas API. The project involves all the basic tools a user will need to annotate on whiteboard along with some enhanced features like, color theme and multiple pages.


## Functionalities

### 1. Toolbar  
By default, when a user lands on whiteboard a toolbar is visible consisting of different tools for assisting him in his/her work. He/she can also close the toolbar and open it again as and whenever required. The toolbar consists of following tools:

- **Pencil**: The default selected tool is pencil with black colour on white theme and white colour on black theme. User can also change the colour and size of pencil according to his convenience from pencil toolbox which can be viewed on clicking pencil icon.

- **Eraser**: User can select an eraser by clicking on eraser icon in toolbar. The width of eraser can be altered as per user’s choice.

- **Sticky-Notes**: On selecting sticky-notes a small div appears on screen with minimizing and closing options. User can make as many sticky-notes as he wants and can set their position by dragging them.

- **Shapes**: Shapes icon can be used to draw different shapes with different outline colours which can be selected from shapes toolbox. It contains a straight line, a rectangle, square, circle, triangle and a rhombus. Shapes of different height and width can be drawn by placing, dragging and releasing the cursor on whiteboard.

- **Undo and Redo**: It facilitates user to undo and redo his actions.

- **Download**: The drawings made on whiteboard can be downloaded as image in PNG format using this tool.

- **Upload**: Any image can be uploaded using this upload option. The uploaded image will appear on whiteboard as a sticky note.

- **Dustbin**: The dustbin tool can be used to clear all the annotations made on whiteboard by the user. This action can also be undone using undo option.

All the above mentioned tools work smoothly as described. The current selected tool can be identified using its distinguished background colour.

### 2. Colour Theme 
Keeping in mind the diversity in user’s preferences of mode- light and dark, I tried to implement this feature in my Whiteboard. There are two colour themes: white and black. User can switch between the two themes anytime he wishes. Switching from white theme to black theme changes the background colour of board from white to black and vice-versa. Accordingly, pencil colours and colour of shapes also changes. Irrespective of the theme user is working upon, if he downloads the board drawings, the downloaded image will always be in default mode only i.e., white.

### 3. Multiple Pages 
User can create as many pages as he wishes and can switch between those pages. The current page number along with next and previous page arrows icons appear on right bottom on the screen. The Whiteboard keeps track of all the actions performed on each page. If the user revisits a particular page he can continue drawing from where he left before changing that page,can undo/ redo his actions of that page. I found this to be the most useful feature while working on a whiteboard. By having multiple pages, the user can continue the discussion in different pages and refer back to initial pages, instead of erasing them. It helps to maintain a continuity while working.
