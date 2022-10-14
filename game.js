kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    clearColor: [0,0,0,1]
})

let isJumping = true // pq true e pq false?
let isBig = false
// let isFalling = true

loadRoot("https://i.imgur.com/")

loadSprite('bloco', 'pogC9x5.png')
loadSprite('enemy', 'KPO3fR9.png')
loadSprite('surpresa', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('moeda', 'wbKxhcd.png')
loadSprite('cogumelo', '0wMd92p.png')

loadSprite('mario', 'OzrEnBy.png', {
    sliceX: 3.9, // dimensão
    anims: {
        idle: { // parado
            from: 0,
            to: 0,
        },
        move: { // andando
            from: 1,
            to: 2,
        }
    }
})

loadSprite('tijolo', 'pogC9x5.png')
loadSprite('tubo-top-left', 'ReTPiWY.png')
loadSprite('tubo-top-right', 'hj2GK4n.png')
loadSprite('tubo-bottom-left', 'c1cYSbt.png')
loadSprite('tubo-bottom-right', 'nqQ79eI.png')

loadSprite('blue-bloco', 'fVscIbn.png')
loadSprite('blue-tijolo', '3e5YRQd.png')
loadSprite('blue-aco', 'gqVoI2b.png')
loadSprite('blue-enemy', 'SvV4ueD.png')



scene("game", ({level, score, big}) => {
    layer(["bg", "obj", "ui"], "obj")

    
    let html = document.querySelector("html"); // pq isso??
    let musica = document.querySelector("#msc1");
    html.addEventListener('click', () => {
        msc1.play();
    }) 

    let html2 = document.querySelector("html"); // pq isso??
    let musica2 = document.querySelector("#msc2");
    

    const maps = [
        [
        '=                                                                                                                                                                  =',
        '=                                                                                                                                                                  =',
        '=                                                                                                                                                                  =',
        '=                                                                                                                                                                  =',
        '=                                                                                                                                                                  =',
        '=                                                               *                                                                                                  =',
        '=                                                                                                                                        ;                         =',
        '=                *                                                                                @  +                                    ;                        =',
        '=                                                             ===========    ====*                                       ===        ===    ;                       =',
        '=                                                                                                                  ;             ;          ;          ;           =',
        '=          *   =*=*=      ;    ;                    ===*===                          ==           *  *  *          ==*         =====         ;      ====           =',
        '=                                                                                                                                                                  =',
        '=                                                                                                                                                            -}    =',
        '=                           @     @                                                                                       @  @                               ()    =',
        '===========================================   ============================   =======================================================================================',
        // '=                                      =',
        // '=                                      =',
        // '=                                      =',
        // '=                                      =',
        // '=                                      =',
        // '=                                      =',
        // '=                                      =',
        // '=                   ;                  =',
        // '=                                      =',
        // '=                                 ;    =',
        // '=      ;   ;   =*=+=      ;            =',
        // '=                                 -}   =',
        // '=                       @   @     ()   =',
        // '========================================',
        ],  

        [
        '!     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        '!           !!!!!!!!!!!!!!!          !',
        '!           !!!!!!!!!!!!!!!          !',
        '!                                    !',
        '!                 ;;;;               !',
        '!               ;;;;;;;              !',
        '!             ;;;;;;;;;;;            !',
        '!           ;;;;;;;;;;;;;;;          !',
        '!           ;;;;;;;;;;;;;;;          !',
        '!           !!!!!!!!!!!!!!!          !',
        '!           !!!!!!!!!!!!!!!     -}   !',
        '!           !!!!!!!!!!!!!!!     ()   !',
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],

        [
            '=                                                                                                                                                              =',
            '=                                                                                                                                                              =',
            '=                                                                                                                                                              =',
            '=                                                                                                                                                              =',
            '=                                                                                   @  @                                                                       =',
            '=                                            ; ; ;@                     ================                                                                       =',
            '=                                          ========                       ============         +                                                               =',
            '=                                             ====                ;       ============                                                                         =',
            '=                                             ====             =======    ============       ======     ;                                                      =',
            '=                                             ====              =====     ============                                                                          =',
            '=                                     ================     ;    =====     ============                 ====           =*=*==*                                   =',
            '=                                       ============     ====   =====     ============                                                                          =',
            '=                           =======     ============      ==    =====     ============                                                                    -}    =',
            '========================     =====      ============      ==    =====     ============                                             @  @  @  @  @          ()    =',
            '========================     =====      ============      ==    =====     =======================================================================================',
        ],

        [
        '=                                        =',
        '=                                        =',
        '=                                        =',
        '=                                        =',
        '=                                        =',
        '=                                        =',
        '=       ; ; ;;; ; ;   ;     ; ; ; ;      =',
        '=        ;  ; ; ; ;    ; ; ;  ; ;;;      =',
        '=        ;  ;;; ;;;     ; ;   ; ; ;      =',
        '=                                        =',
        '=                                        =',
        '=                      @@@@@@@@@@@@@     =',
        '==========================================',
        ]
    ]      

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('bloco'), solid()],
        ';': [sprite('moeda'), 'moeda'],
        '*': [sprite('surpresa'), solid(), 'moeda-surpresa'],
        '+': [sprite('surpresa'), solid(), 'cogumelo-surpresa'],
        '#': [sprite('unboxed'), solid()],
        '@': [sprite('enemy'), 'dangerous', body()], // body = ter física
        '%': [sprite('cogumelo'), 'cogumelo', body()],

        '~': [sprite('tijolo'), solid()],
        '(': [sprite('tubo-bottom-left'), solid(), scale(0.5)], // scale  tamanho
        ')': [sprite('tubo-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('tubo-top-left'), solid(), 'tubo', scale(0.5)],
        '}': [sprite('tubo-top-right'), solid(), 'tubo', scale(0.5)],
        '!': [sprite('blue-bloco'), solid(), scale(0.5)],
        '/': [sprite('blue-tijolo'), solid(), scale(0.5)],
        'z': [sprite('blue-enemy'), body(), 'dangerous', solid(), scale(0.5)],
        'y': [sprite('blue-surpresa'), solid(), 'moeda-surpresa', scale(0.5)],
        'x': [sprite('blue-aco'), solid(), scale(0.5)],
    }

    const gameLevel = addLevel(maps[level], levelCfg)

    
    const scoreLabel = add([
        text('Moedas: ' +score, 10),
        pos(24,20),
        layer('ui'),
        {
            value: score
        }
    ])

    add([text('Level: ' + parseInt(level + 1), 10), pos(24,4)])
    // 
    // if (level[0]){
    //     add([text('Devido a alguma particularidade do Google, é necessário clicar em qualquer canto da tela para que se inicialize a música do game.', 10), pos(24,15)])
    // }
    // const aviso = alert('')

    function big(){
        return{
            isBig(){
                return isBig
            },
            smallify(){
                this.scale = vec2(1)
                isBig = false
            },
            biggify(){
                this.scale = vec2(1.5)
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario', {
            animsSpeed: 0.1,
            frame: 0
        }),
        solid(),
        body(),
        big(),
        pos(50,0),
        origin('bot'),
        
    ])

    if(isBig){
        player.biggify
    }

    keyDown('left', () => {
        player.flipX(true) // girar o personagem
        player.move(-130,0)
    })

    keyDown('right', () => {
        player.flipX(false)
        player.move(130,0)
    })

    keyPress('up', () => {
        if(player.grounded()){
            player.jump(390)
            isJumping = true
        }
    })

    keyPress('space', () => {
        if(player.grounded()){
            player.jump(390)
            isJumping = true
        }
    })

    // animando o mario andando"
    keyPress('left', () => {
        player.play('move') // dando o "play na animação"    
    })

    keyPress('right', () => {
        player.play('move') // dando o "play na animação"    
    })

    ////////

    // animando o mario parado dps de andar ou pular//

    keyRelease('left', () =>{
        player.play('idle')
    })   
    
    keyRelease('right', () =>{
        player.play('idle')
    })  

    // keyPress('up', () =>{
    //     player.play('idle')
    // })

    // keyPress('space', () =>{
    //     player.play('idle')
    // })

    ///////

    action('dangerous', (obj) => {
        obj.move(-30,0)
    })

    player.action(() => {
        if(player.grounded()){
            isJumping = false
        }
       
            camPos(player.pos)
        
 
    })

    
    player.on('headbutt', (obj) => { // colidir com a cabeça
        if(obj.is('moeda-surpresa')){ // se o obj for esse...
            gameLevel.spawn(';', obj.gridPos.sub(0,1))  // spawna isso, destroi e spawna o bloco pós-surpresa
            destroy(obj)
            gameLevel.spawn('#', obj.gridPos.sub(0,0))
            
        }

        if(obj.is('cogumelo-surpresa')){
            gameLevel.spawn('%', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('#', obj.gridPos.sub(0,0))
        }

    })

    action('cogumelo', (obj) => {
        obj.move(30,0)
    })

    player.collides('cogumelo', (obj) => {
        destroy(obj)
        player.biggify()
    })

    player.collides('moeda', (obj) => {
        destroy(obj)
        scoreLabel.value++
        scoreLabel.text = 'Moedas: ' + scoreLabel.value
    })

    player.collides('dangerous', (obj) => {
        if(isJumping){
            destroy(obj)
//         }else if(isFalling){
//             destroy(obj)
        }else{
            if(isBig){
                player.smallify()
                player.action(() => {
                    isJumping = true
                })
            }else{
                go("lose", ({score: scoreLabel.value}))
            }
        }
    })

    player.collides('blue-enemy', (obj) => {
        if(isJumping){
            destroy(obj)
        }else{
            if(isBig){
                player.smallify()
                player.action(() => {
                    isJumping = true
                })
            }else{
                go("lose", ({score: scoreLabel.value}))
            }
        }
    })

    player.collides('tubo', () => {
        keyPress('down', () => {
            go('game', {
                level: (level + 1) % maps.length,
                score: scoreLabel.value,
                Big: isBig
            })
        })
    })




})

    

scene("lose", ({score}) => {
    add([text('Voce perdeu', 18), origin('center'), pos(width()/2, height()/3)])
    add([text('Score: ' +score, 18), origin('center'), pos(width()/2, height()/2)])
    add([text('Carregando uma nova tentativa....'), origin('center'), pos(width()/2, height()/1.5)])
    
    setTimeout(function() {
        window.location.reload(1);
      }, 4000);

    msc1.pause()
    msc2.play()
})

go("game", ({level: 0, score: 0, big: isBig}))
