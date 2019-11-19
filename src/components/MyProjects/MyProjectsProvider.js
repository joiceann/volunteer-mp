import axios from 'axios'
import instace from '../../axios'
import * as consts from '../../constants'

const createAxiosCancelToken = () => {
    const cancelToken = axios.CancelToken
    const cancelTokenSource = cancelToken.source()
    return cancelTokenSource
}

const getUserInfoByToken = (axiosCancelTokenSource) => {
    return new Promise((resolve, reject) => {
        instace.get(consts.USER_PROFILE, { cancelToken: axiosCancelTokenSource.token })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
}

const enrollOrOptOutFromProject = (projectId, userId, status, axiosCancelTokenSource) => {
    return new Promise((resolve, reject) => {
        instace.get(`${consts.ENROLL}/${projectId}/${userId}/${status}`, {
            cancelToken: axiosCancelTokenSource.token            
        }).then(response => {
            resolve(response.data)
        }).catch(error => reject(error))
    })
}

const updateVolunteerRole = (projectId, userId, role, axiosCancelTokenSource) => {
    return new Promise((resolve, reject) => {
        const standardizedRole = role !== 1 ? 99 : role

        console.log(`${consts.UPDATE_ROLE}/${projectId}/${userId}/${standardizedRole}`)

        instace.get(`${consts.UPDATE_ROLE}/${projectId}/${userId}/${standardizedRole}`, {
            cancelToken: axiosCancelTokenSource.token            
        }).then(response => {
            resolve(response.data)
        }).catch(error => reject(error))
    })
}

const getONGProjects = (axiosCancelTokenSource) => {
    return new Promise((resolve, reject) => {
        instace.get(consts.GET_PROJECTS_ONG, { cancelToken: axiosCancelTokenSource.token })
            .then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
    })
}

const getAllProjects = (axiosCancelTokenSource) => {
    return new Promise((resolve, reject) => {
        instace.get(consts.PROJECTS_LIST, { cancelToken: axiosCancelTokenSource.token })
            .then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
    })
}

const getAllProjectsDummy = (axiosCancelTokenSource) => {
    return new Promise((resolve, reject) => {
        const projects = []

        for (var i = 0; i < 10; i ++) {
            projects.push(dummyProject)
        }

        resolve(projects)
    })
}

const getUserTypeFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
        const userType = localStorage.getItem('V_USER_TYPE') || null

        if (userType) {
            resolve(userType)
        } else reject('UNDEFINED_USER_TYPE')
    })
}

const dummyProject = {
    "news": [
        "5dabb4e21c9d440000cd9deb",
        "5dabb4e21c9d440000cd9deb",
        "5dabb4e21c9d440000cd9deb",
        "5dabb4e21c9d440000cd9deb",
        "5dabb4e21c9d440000cd9deb",
        "5dabb4e21c9d440000cd9deb",
        "5dabb4e21c9d440000cd9deb",
        "5dabb4e21c9d440000cd9deb",
        "5dabb4e21c9d440000cd9deb",
        "5dabb4e21c9d440000cd9deb"
    ],
    "photo": [
        "http://lorempixel.com/640/480",
        "http://lorempixel.com/640/480",
        "http://lorempixel.com/640/480",
        "http://lorempixel.com/640/480",
        "http://lorempixel.com/640/480",
        "http://lorempixel.com/640/480",
        "http://lorempixel.com/640/480",
        "http://lorempixel.com/640/480"
    ],
    "volunteers": [
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Líbano",
            "bio": "Increíblemente Incorregibilidad Abad Abalada Engargantadura Batavia. Abaldonamiento Ceñar Engarro General Cenagoso Incorrecto Engarbullar Bateador Abacero. Ficción Cendrar Abadiato Engargantar Cencellada Cenegar Cencerreo Cenceño Engargante. Descentralizar Gemiqueo Engargantadura Batatazo Batatazo. Fidedigno Descerar Ficción Generalísimo Gemoso Ficha Descimbramiento Cencido. Incorrecto Gendarme Bastonazo Fido Incorrecto Genealogista Cendalí Engarrafar.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Berta Esquivel",
            "phone": "5096-646-524"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Bielorusia",
            "bio": "Gemiquear Fideero Descerrar Abalada Descerar. Gendarme Incorruptible Fidalgo Batalla Genealógico Deschavetarse Fichero Genealógico. Desciframiento Batata Abadí Descentrado Cencerra Cencerrillas Descerco Ficción Genealogista Incorruptible. Fidedigno Ficción Descerco Descensión Engarzadura. Descifrar Engarmarse Cenefa Abalar Engarronar Géminis. Incorrección Bata Descerrar Bateaguas Cencerrear Cenceñada Gemiquear Engarrotar Geminado Descenso.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Caridad Quiros",
            "phone": "5464-406-656"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Bélgica",
            "bio": "Batallaroso Engasgarse Batazo Incredibilidad Incruentamente Cencerrón Deschavetado Engarbarse. Engargolar Abacorar Descentrado Cenata Abacorar Gemoterapia Batahola Cencerrear. Cendrada Gemiqueo Engastador Engargantar Cenefa Descepar. Cencerrada Descenso Incorrupción Bastonero. Incorrección Abalaustrado Incorrecto Incorpóreo Engasgarse Incorporo Engargolar Batallaroso Engargante Incorruptible.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Camila Piña",
            "phone": "5875-756-847"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Bermuda",
            "bio": "Abad Gemoso Descensión Abajo Descercado Abajeño Descercador Ceneque Genealogista. Engarzar Generación Increíblemente Cenaoscuras Abacora Fidecomiso Bate Abadía Cencuate. Cencerrear Geminar Engasgarse Fideo. Increpar Cencivera Batacazo Engarnio Abalar Batatazo. Engargolado Geminado Descentralización Bastonero Descharchar Cencerril.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Isabela Leiva",
            "phone": "5235-725-619"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Bahamas",
            "bio": "Cencerrón Batallón Cencuate. Gemir Engarzar Cendolilla Abacero Generable. Cenco Cendal Fice Batán Increíblemente Abacería Cendra Cendal Descifrador.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Monserrat Alfaro",
            "phone": "5655-478-370"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Chile",
            "bio": "Batanero Basura Engarbullar Engarzador Incordio Genearca Engargantadura Cendrar. Incorrecto Engastar Géminis Abajamiento Abacería Bastonazo. Fichar Cenca Genciana. Abalaustrado Incorporal Batán Batalla Engarce Batato Incremento Engarrotar Descentralización. Descentrar Engargantar Bastonada Incorporal Incrementar Abadiato Incorrección Gémino Geminar Descerrajadura. Cenca Cenca Gen Abad Descimbrar Cencerrear Incorrupción Bátavo.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Armando Xana",
            "phone": "5050-216-483"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Jamaica",
            "bio": "Cendrada Fidecomiso Engarce Cencerril Abalaustrado. Batallador Abalanzar Cenefa Gemiquear Gemoso Gemiqueo Incrustación. Deschavetado Incriminación Engarfiar Engargante Ficción Cenegar Incorporalmente Descepar. Descentralización Abalaustrado Céndea Genearca Cenegar Descerrar Descentralización Abadí Deschapar Cenal. Abadía Generacional Engargante. Incorporalmente Incriminar Engarzador Géminis General Engarbullar Descifrador Gemiquear Descharchar.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Margarita Partida",
            "phone": "5203-602-445"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Gambia",
            "bio": "Descerezar Incrustación Abalar. Bastonero Engarbullar Generación. Engarnio Gemoterapia Fidecomiso Incorporal.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Jorge Luis Matos",
            "phone": "5755-189-168"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Malta",
            "bio": "Engarce Abajadero Abalada Bástulo. Ficción Cencha Increíble Cendrada Abadía Cenegar. Descerrar Incorrectamente Cencerro Bateador Incorregibilidad Deschavetarse Descifre Geminar Descensión. Descerrar Increpador Cencha. Incremento Cenefa Genealogía Abajamiento Descimbramiento Cencivera Cencerrear Cenata Batacazo.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Lucas Ponce",
            "phone": "5076-006-018"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Islas Faro",
            "bio": "Incorruptible Batea Abadía Batanga Incorporal Cencivera Gemológico. Incredibilidad Abaldonamiento Engargolado Bata Batanear Descifrar. Batalloso Fideísmo Bate Bateador. Bastonero Gémino Abacería Batavia Genearca Incredibilidad. Cenagar Fidalgo Incremento Descepar Engastar Geminación. Generacional Batatazo Cenceño Batallar Batanar Cencha Abajamiento Incriminación Engarmarse Abaco.",
            "photo": "http://lorempixel.com/640/480",
            "name": "María Eugenia Barraza",
            "phone": "5944-078-560"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Cuba",
            "bio": "Gemología Abajo Incorporeidad Engastador Descercar. Géminis Incrementar Cenca Increpador Bastonazo Engarrar Batazo. Abacería Incrédulamente Basura. Fidelidad Incorporalmente Increíble Engarrafar Abadengo Geneático. Batata Engarzar Cenero Engaritar Fichar Ficoideo Gemológico Descensión.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Ángel Gabriel Pacheco",
            "phone": "5802-334-470"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Uganda",
            "bio": "Descifre Abajamiento Cenata Ficoideo Engarce Abacalero Fideísmo Abadengo Batazo Incorregibilidad. Incorrupción Incorrectamente Descerebrado. Engarzar Incruentamente Engarberar Cendolilla Cencío Cencerreo Cencerril Cenefa Incorporal Batán.",
            "photo": "http://lorempixel.com/640/480",
            "name": "María Eugenia Alicea",
            "phone": "5427-256-707"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Letonia",
            "bio": "Descifre Cencerreo Cenal Cencuate Cendradilla. Descerco Incrementar Engastador Engaritar Bastonazo Abaco. Bástulo Gémino Géminis Incriminar Fideicomitente Fichero Fidecomiso. Engarro Fidedigno Cenagar Cenceño Incrasar Generacional. Engarce Descensión Fideísmo Generable Abaldonamiento Fideicomiso Gemólogo.",
            "photo": "http://lorempixel.com/640/480",
            "name": "María Soledad Bustamante",
            "phone": "5691-619-221"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Portugal",
            "bio": "Incorporeidad Incorporar Incristalizable Basurear Engargante Cenal Bataola Generacional Gemoso Incorporar. Generación Engarrafador Engargolar Descimbramiento Abajeño Bastonear Incorporalmente Descepar Incrasar. Incordio Incruento Incorrección Gendarme Fiducia Cenegar Abadiado Cenata. Genealogía Céndea Abacero Abajera Bastonazo Engarce Fidecomiso Abadesa Fideicomitente Gemólogo. Gemológico Incorregiblemente Descerrumarse Abad. Descervigamiento Generación Gemólogo Descerrajar.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Dolores Leal",
            "phone": "5937-358-289"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Alemania",
            "bio": "Descentralización Ceñar Batallola. Cencerrada Batanear Engarzadura Abadernar Engarmarse Abalar Incorporar Cencerrada Cenata Descerrar. Batán Ceneque Generacional Descervigar Incorregibilidad Descerezar. Batalán Incorpóreo Increado Abacial Engargantar. Engarronar Gemoso Abajeño Increíble Gemoterapia Engarronar Incorporación Batalán Descimbrar. Bastoncillo Céndea Engastar Descentralización Cendradilla Descensión Descensión.",
            "photo": "http://lorempixel.com/640/480",
            "name": "María Eugenia Torres",
            "phone": "5073-346-667"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "China",
            "bio": "Incriminación Cendradilla Descercar Cencido. Abaldonamiento Cencío Batallón Generación Incorporación Batatazo. Abajadero Cencuate Gendarme Engastadura.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Rosa María Xairo Belmonte",
            "phone": "5417-190-288"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Madagascar",
            "bio": "Gemoso Incriminar Cencerrillas Descercar Engarrotar Desciframiento Bástulo Gemológico Cenata. Cenagoso Incorregible Cendra Incristalizable Generala Cencerra Descentralización Engargolar. Descerco Engastar Abadejo Engarbarse.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Carolina Ñañez",
            "phone": "5978-448-289"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Francia",
            "bio": "Generalidad Generable Cendrazo Abacería. Batallaroso Fideero Cencivera Engargolado Cendrada. Cendra Incruentamente Cendrar Descerebrado Incruentamente Bateaguas. Abajo Engaritar Cencerrillas Ficoideo Descerebración Incristalizable. Descentralización Engastador Descifrable Descifrar Bateaguas Incriminar Incorrupto Basural Cencerril.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Daniela Lovato",
            "phone": "5548-183-161"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Tonga",
            "bio": "Bateaguas Generacional Incrédulo Incruentamente Descentrado Cencerro. Cencerrear Geminación Basurero Deschavetado Cenagar Batea. Fichaje Batayola Abacero Cendal Desceñir Engarbullar Descercado.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Ignacio Llamas",
            "phone": "5314-915-729"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Guinea Ecuatorial",
            "bio": "Generacional Ceneque Descerrar Cencivera Generalato Cenero Incorporo Engarro Abalada. Batea Incorporalmente Abadiato Cenal Engarfiar Batahola Cencerrada Cencerreo Batata Generable. Incorregible Gemológico Cendrazo Descerar Cenco. Engarce Cenagar Incrustación Generalidad Incrementar Engarrafador Cencivera Cencapa Incorruptamente.",
            "photo": "http://lorempixel.com/640/480",
            "name": "César Alvarado",
            "phone": "5035-073-253"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "India",
            "bio": "Abacalero Cencerra Abajera Ceñar Cenestesia Incriminación Basural. Bateador Engarrafador Generalidad. Generación Gemología Engaste Descercador Gémino. Incorpóreo Fice Increado Engarmarse Descervigar Increíble Incorregible Cencerreo. Descentralización Descerrajadura Descerezar Batazo Abadiato Abalar Gendarme Incorregible Cenefa Fice. Bastoncillo Cencapa Gemiqueo Deschavetado Batallador Abajar Cenero Bate.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Salvador Bonilla",
            "phone": "5053-333-993"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Macedonia",
            "bio": "Gemoterapia Abalar Batanar Genciana Abalanzar Cendrado Gemir Engarrafar Gemoterapia. Generala Gemoso Descercador Incorregible Bastonazo Fidalgo Fichar. Increado Cenaoscuras Gemiqueo Batallola Batallola Gemoterapia Fidelísimo. Batallola Batatazo Abaldonamiento.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Javier Arroyo",
            "phone": "5670-819-132"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Emiratos Árabes Unidos",
            "bio": "Descimbrar Descifrar Céndea Engastador Engarmarse Batanear Cenal Cendal Generalato Ficticio. Gemólogo Engargantadura Cenagoso Genealogía Cendrada Cencerrear Batanar Descentrado Descervigar. Descentralizar Batalloso Batalán Engarbarse.",
            "photo": "http://lorempixel.com/640/480",
            "name": "José Emilio Espinosa",
            "phone": "5990-372-741"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Grecia",
            "bio": "Generacional Cencerrear Increado Cendrada Bate Incorrección Abaldonamiento. Geminación Abacial Cendrazo Descentrar Engarronar Descifrar Increado Cencerro Descenso Abacero. Engastadura Bátavo Incorregible Generala Cenceñada Descimbrar Engargantar Engastador Engargante. Increíblemente Engarzar Cencío Fidedigno Ficticio Abajeño Gendarmería.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Juan Covarrubias",
            "phone": "5327-128-606"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Kenia",
            "bio": "Abaldonadamente Deschuponar Cenca Descerrajar Batallona Cendolilla. Gemir Abacería Generalidad Abalaustrado Cendolilla Gemoso. Cenata Incorrección Engargante Basura Descifrar Engarrafador. Engarce Cenco Batalloso.",
            "photo": "http://lorempixel.com/640/480",
            "name": "María Eugenia Koenig",
            "phone": "5818-159-974"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Nigeria",
            "bio": "Fichero Cencero Descerrajado Fideicomisario Ceñar Incorporar Cencido Descentralizador. Geminado Cencerrado Cencerrillas Fichar. Geminar Incrédulamente Bateador Descerar Incorporación Incredibilidad Cencha Ceneque Engarzar Cenagar. Incremento Batavia Incrasar Basurero Incrasar Generala Generacional Abacero Cendalí Gemonias.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Lucia Gracia",
            "phone": "5324-012-692"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Siria",
            "bio": "Batato Generalidad Cencerreo Batanero. Abalada Gemología Cencerro Cenagoso Cendrar Abajar. Incruento Descentralizador Desceñir Engarnio Engarbarse Incorporeidad Incrédulo Descerrajado. Descepar Incorrupto Incrementar Geneático Generalísimo Cenal.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Evelyn Alcala",
            "phone": "5340-201-820"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Croacia",
            "bio": "Genearca Engarrar Fichero Abalada Deschavetarse. Cencerreo Geneático Engargolar Abajamiento Incredulidad. Engarzador Cenero Batalloso.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Nicole Arevalo",
            "phone": "5312-301-455"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Mauritania",
            "bio": "Fichar Descercador Abadía Incorruptible. Cencuate Batalán Cenceño Fichar Cenata Géminis Engastadura Incorporal Incorporación. Abacero Descerrajar Abaco Abada Batato Cencerreo Gemiquear Cendrada Batalla Abajeño. Generalísimo Cenca Descerrajadura. Incorporar Gendarmería Geminar Engaste Gémino. Incriminación Abaco Gemiqueo Increpación Incorregible Basurero Incorporación Incorporo.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Esteban Bermúdez",
            "phone": "5284-125-580"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Letonia",
            "bio": "Gemonias General Fideicomisario Genealógico Incrédulamente. Incorporal Batallar Cencellada Descerco Cenata. Cencerrado Descerebración Cendrada. Descercar Batanear Cencerrear Abadiado Increpación.",
            "photo": "http://lorempixel.com/640/480",
            "name": "María Teresa Farías",
            "phone": "5119-698-458"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Botswana",
            "bio": "Engargantar Fideero Abacora Incremento Bateador Ceñar Fideísmo Incriminar Descerezar Cencerreo. Batacazo Incrustación Fideicomiso Cenco Cencerrada. Ceñar Engarce Engarrafar Abacalero Descerezar Incrasar Cencuate Abalada Increpación Engastar. Cenal Engastadura Ceneque Incorporación. Cencerrón Abacalero Deschavetarse Descerebrar Cendrar Cendolilla. Descercar Fichero Engarrotar Cencerrillas Cendradilla Descerrar Cenestesia Abajeño.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Rafael López",
            "phone": "5913-493-321"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Zambia",
            "bio": "Engarro Incorrupto Cenagar Batea Incorregible. Basurero Gemonias Descenso Incorrección Incorregiblemente Descifrable Descerrajado. Descerebrar Abadí Increado. Fice Descercador Abacería Descerrajadura Engarronar. Gen Batallaroso Céndea Bastoncillo Fideicomitente Engargolar Incruentamente. Incorporo Cencerrada Bátavo Gendarmería.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Verónica Alonso",
            "phone": "5501-083-301"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Armenia",
            "bio": "Incrustación Batallola Abalar Cenaoscuras Geminación Cenata. Bate Batahola Gemíparo Incredibilidad Cenata. Cenal Ficticio Batata Engarrafador Batayola Cencellada Batanear Batalán Cencerro. Incorregibilidad Engarzadura Batallador Increpación Increíble Engarfiar Incriminar. Descerebrado Cencero Fidalgo.",
            "photo": "http://lorempixel.com/640/480",
            "name": "María Elena Laureano",
            "phone": "5000-272-435"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Haiti",
            "bio": "Abalaustrado Bastonero Descerrumarse Abacial. Gencianeo Batayola Descervigamiento Deschavetarse Incorruptible. Fidelísimo Gendarme Ceñar Cenestesia Engasgarse.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Esteban Campos",
            "phone": "5042-351-361"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Tanzania",
            "bio": "Genealógico Batacazo Batalla Bástulo Cencerril Abalaustrado Bastonero Gemólogo Geminado Incorruptible. Abacería Engarrafar Incorrecto Cenal Engarberar Fichero. Bata Incorregibilidad Abacalero Abacial Descensión. Engarro General Cencivera Abadesa Gemológico Fice Batallón. Batallador Batalán Descerebrar Cendrar Cendrado Engarberar Descerrumarse Descerebrado Fideero Gencianeo.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Teodoro Olvera",
            "phone": "5103-558-860"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Macao",
            "bio": "Cendrado Cencerrear Fidecomiso Cendrazo Descifrar Cendrada Batata. Cencerreo Batacazo Bastonear Engargantadura Descerrajadura Geminación Batanero. Cencuate Bata Generalísimo Descervigamiento Genciana Abalada Bastoncillo Descepar.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Gael Santiago",
            "phone": "5790-000-393"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Japón",
            "bio": "Gencianeo Descervigar Basurero Descepar Cenata. Gemología Cencido Geminado Cencellada Abalaustrado. Engarrafar Géminis Cenata Abaldonamiento Batallona Incremento Abada Descensión. Fidecomiso Gemiquear Descentralización Bateador. Abacero Abad Deschapar Fideicomiso Batahola Descerrumarse Cenceñada Increado Abacero Gemológico. Genealógico Batato Descervigar Engasgarse Ficha.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Blanca Zayas",
            "phone": "5696-941-730"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Chad",
            "bio": "Descentralización Incorporalmente Cendradilla Deschavetado. General Fichar Batallón Engastar Engarbarse Incorporar Batallola Batata. Abajar Cenco Cencerrado. Increpar Cenceñada Incorrupto Descimbramiento Descerezar Incorruptible Incordio. Descerrajar Bátavo Engarronar Fideero. Abajo Abadiado Incrustación Gemoso Ficticio Batallador Fichaje Batanar Fidelísimo Incorrecto.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Débora Márquez",
            "phone": "5526-531-253"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Estonia",
            "bio": "Increíble Bastoncillo Descifrable Engargolado Cendolilla Incorrecto Abalanzar Gendarme Cenceñada Descerrajar. Desceñir Descentralizador Abajamiento Bátavo Descharchar Cenceñada Incorpóreo Gencianeo. Abacería Bate Fideicomitente Cencapa Basurear Cencerril Abacorar Descensión Cendrada.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Aarón Vásquez",
            "phone": "5967-356-557"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Dominica",
            "bio": "Cencivera Incruentamente Géminis Increpación Abacorar Batallador. Cenefa Ceñar Engarrar Deschapar Cenagoso Fidalgo Abadiado Céndea. Engastador Batacazo Cenagoso Incorporar Engargantar Fidedigno Descercado Cendradilla Engasgarse. Cenero Batazo Fido Gencianeo Batata Engarrafar Engarnio Batalloso.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Carolina Razo",
            "phone": "5067-189-301"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Chile",
            "bio": "Abadiado Abajera Abacalero Incorpóreo Incorruptibilidad. Cenceño Abajeño Incorrupto. Incorporar Batalloso Descentralizador Descerar Engarce Cencerril. Engargolar Cencerrear Engarronar Incorrecto Incristalizable Cendolilla Increíble.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Pilar Karan",
            "phone": "5206-662-785"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Vanuatu",
            "bio": "Deschapar Cencerril Generalísimo Batahola Incrasar. Increíblemente Fichero Increíble Descentrado Bastonear Abadí Increpación. Descerrajar Bateador Descerco Cenagoso Genciana Batallar Incrementar. Gencianeo Descentrar General Engarzador Cenestesia Abacalero Descharchar Abajamiento Cencerreo Cenal.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Carolina Ávalos",
            "phone": "5450-109-908"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Jamaica",
            "bio": "Bástulo General Abadía Abajar Cenagar Incruentamente. Incredulidad Engarrafar Cencapa Batán Descerebrar Batallaroso Batalán Ficción. Cenal Engarzador Descifre Descerrajar Bástulo Ficha Generacional Fidalgo Cenata Batacazo.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Diego Flórez",
            "phone": "5882-567-958"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Uganda",
            "bio": "Cencerril Ceñar Engarzador Engargante Cencerreo Engargantadura Descentrar. Geminar Abajadero Abacería Cenestesia Engarrafar Bastonada Cenceño Engarro Engarnio. Incruento Abajar Cenca Batato Desciframiento Engarro Cenefa. Fichero Cenefa Abalanzar Fideicomitente.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Mauricio Valenzuela",
            "phone": "5273-880-193"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Eritrea",
            "bio": "Abada Bata Descercado Descerebrar Abadiado Cencellada Cenceñada Bátavo. Deschavetado Descerebración Abacero. Ficticio Abaldonadamente Bata Gemiquear Batalán Incorrupción Abadengo Incorporación. Genealogía Fideísmo Bastonero Batavia Descervigar Descharchar Gemólogo Incruentamente Batavia Geminación. Cencapa Incrementar Gemológico Abajar Generable Gémino Bástulo.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Pablo Benítez",
            "phone": "5286-180-364"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Italia",
            "bio": "Incriminación Fideero Descensión Fice Descentrado Abajar Fideo Gemíparo Batea. Batayola Deschavetarse Cenceño. Engarzadura Incorporación Incorregiblemente Cencerril Engargantadura. Abajamiento Increíblemente Generalidad Fichaje Incorporeidad Cenagoso.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Manuela Girón",
            "phone": "5380-668-333"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Mongolia",
            "bio": "Batanar Descimbramiento Generalato Abadí Batán Cencivera Descerrar Deschapar. Basurero Engarronar Descerrajar Bataola Incorrectamente. Engarnio Generable Cencellada Incorporación. Cencerrada Descepar Fido Batato Incrédulamente Batallaroso Deschavetarse.",
            "photo": "http://lorempixel.com/640/480",
            "name": "David Puga",
            "phone": "5531-349-154"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Barein",
            "bio": "Abalaustrado Cencerra Generación Fideísmo Cendrar Incorporalmente Cendrazo. Geminación Abada Batalla Engarberar Cencido. Basurero Incorrección Bastoncillo Gemiquear Fidelísimo. Cenceñada Abadiado Incorporación Incrédulo Fichaje Descentralizar Bástulo Fiducia. Abaldonadamente Generalidad Genearca Cendrada Batalloso. Incrédulo Cenaoscuras Cenero.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Estela Yanes",
            "phone": "5469-566-594"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "Argentina",
            "bio": "Abadejo Cencellada Engarnio Incredibilidad Gemoso. Descercado Abada Fidelidad Gemíparo Genciana. Abad Batanero Bata Abajamiento Batalloso Descerrajadura. Batavia Incorpóreo Cendal Cencerril. Abajamiento Desceñir Cenata Descensión Incorregibilidad Batayola Descerrar Gemólogo. Cenestesia Batallaroso Cenceño Incorrupto Increíble Engarce Incremento Gemología Fichar Abajo.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Octavio Angulo",
            "phone": "5463-637-859"
        },
        {
            "id": "5dad34501c9d4400008a1b2b",
            "role": 1,
            "nationality": "República Dominicana",
            "bio": "Deschavetarse Abadiado Engarbullar Engarzar. Batallaroso Gemológico Gemólogo Engarrafar Bastonazo Cencerrillas. Descerezar Fichaje Cenata Descharchar Genealogía Batanero Descerrar.",
            "photo": "http://lorempixel.com/640/480",
            "name": "Eva Ojeda",
            "phone": "5613-865-634"
        }
    ],
    "_id": "5dc0e966ba67d450ecb608bb",
    "organinfo": {
        "id": "5dad34501c9d4400008a1b2b",
        "name": "Fundal"
    },
    "name": "Incorporo Abajeño Engarronar",
    "address": "8070 José Emilio Barrio",
    "state": 1,
    "mage": 18,
    "sdate": "2019-11-04T14:22:15.473Z",
    "fdate": "2020-09-02T01:30:30.458Z",
    "sdatei": "2019-11-04T15:21:40.089Z",
    "fdatei": "2020-05-30T17:25:59.036Z",
    "desc": "Abalar Abaldonamiento Fido Cenceñada Engargantadura Abacalero Fidedigno Deschavetarse Bastonero. Descerrar Cencerril Descervigar Abajar Gemiqueo Abaldonamiento Abadejo Deschavetarse Deschavetado Descenso. Abad Abaco Ceñar Descerrumarse Gémino Generala Bátavo Generación. Increíble Cenestesia Cendolilla Descerco Batato Incorporal Descharchar. Cendalí Abacero Engasgarse Fidelísimo Cenaoscuras Engastadura. Engarrotar Batallaroso Bátavo Batalloso Fidelísimo Descercar Batanero.",
    "type": 1,
    "lastupt": "2019-11-04T11:03:34.736Z",
    "__v": 0
}

export {
    getAllProjects,
    createAxiosCancelToken,
    getAllProjectsDummy,
    getUserTypeFromLocalStorage,
    updateVolunteerRole,
    enrollOrOptOutFromProject,
    getUserInfoByToken,
    getONGProjects
}