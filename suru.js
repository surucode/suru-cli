// avec stockage dans une variable pour reinvocation plus tard
const hello = task(() => {
  // On définie des metadata pour la tache
  // 
  name("hello");
  desc("Say hello");

  // On définie les arguments possibles grace à 
  // https://github.com/nodeca/argparse
  // 
  arg(["-U", "--uppercase"], { action: "storeTrue" });
  arg("who", { defaultValue: "world", nargs: "?" });

  // On définie réellement ce qui va être fait dans la tache
  //
  run(({ who, uppercase }) => {
    console.log();
    console.log(`Hello ${uppercase ? who.toUpperCase() : who} !`);
    console.log();
  });
});

// Ici on définie une tache sans récupérer sa référence
task(() => {
  name("toto");
  desc("appelle hello avec michel");

  run(() => {
      // On peut appeler une autre tache depuis sa référence
      hello({
          who: "michel"
      });

      // Ici on voit qu'on peut aussi l'appeler grace à son "name"
      invoke("hello")({
          who: "michou"
      });
  });
});
