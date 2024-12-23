document.addEventListener("DOMContentLoaded", () => {
    function getProjectFromUrl(){
        const params = new URLSearchParams(window.location.search);
        return params.get('project');
    }

    async function displayProjectDetails() {
        const projectName = getProjectFromUrl();
        if (projectName){
            const decodedProjectName = decodeURIComponent(projectName);
            const projects = await fetch('projects.json').then(response => response.json());
            const project = projects.find(proj => proj.Name === decodedProjectName);
            if (project){
                
                const project_info = document.getElementById('project_info');
                project_info.innerHTML = `
                    <h1>${project.Name}</h1>
                    <p>${project.Description}</p>
                `;

                const project_img = document.getElementById('project_image');
                project_img.src = "images/"+ project.Image;

                if (project.Video) {
                    const project_video = document.getElementById('project_video');
                    project_video.innerHTML = `<source src="videos/${project.Video}">`
                }
            }
        }
    }

    displayProjectDetails();
});