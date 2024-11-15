let header = document.getElementById('headerbody')

const backgrounds = [
    './assets/images/headerbg1.webp',
    './assets/images/headerbg2.webp'
]

let selectedIndex = 0

const goNext = () => {
    selectedIndex = selectedIndex === backgrounds.length - 1 ? 0 : selectedIndex+1
    header.style.transition = `600ms background ease-in-out`
    header.style.backgroundImage = `url('${backgrounds[selectedIndex]}')`
}

const goPrevious = () => {
    selectedIndex = selectedIndex === 0 ? backgrounds.length - 1 : selectedIndex-1
    header.style.transition = `600ms background ease-in-out`
    header.style.backgroundImage = `url('${backgrounds[selectedIndex]}')`
}

document.querySelectorAll('.navigate').forEach(item => {
    item.addEventListener('click', (e) => {
        if(e.currentTarget.id == 'go-previous')
            goPrevious()
        else
            goNext()
    })
})