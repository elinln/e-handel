window.addEventListener("load", async () => {
    const session = localStorage.getItem("sessionID")
    if(session == null) {
        console.log("Du har redan genomfört köpet")
        return
    }
    let respone = await fetch("/api/session/verify", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ session })
    })
        .then((result) => {
            return result.json();
        })
        .then((session) => {
            console.log(session);
            localStorage.removeItem("sessionID")
        })
        .catch((err) => console.error(err));

})
