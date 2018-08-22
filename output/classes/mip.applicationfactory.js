Ext.data.JsonP.mip_applicationfactory({
	"files": [],
	"uses": ["cls.*"],
	"id": "class-mip.applicationfactory",
	"tagname": "class",
	"name": "mip.applicationfactory",
	"extends": "cls.mip",
	"author": "",
	"comment": "\u003ch3\u003ePurpose\u003c/h3\u003e\n\u003cp\u003eThe application factory\u0027s main purpose is to manage the life-cycle of\napplication and service objects, and therefore, to provide services on demand.\u003c/p\u003e\n\u003ch3\u003eApplications\u003c/h3\u003e\n\u003cp\u003eConfiguration information for applications are captured in the environment\nclass, and can potentially be overridden in the startup configuration files too.\u003c/p\u003e\n\u003ch4\u003eExample: Define an application in the environment class\u003c/h4\u003e\n\u003cp\u003eThe following include file is used in the environment class to define the\nproperty and to specify the default class that must be used to instantiate the\napplication.\n{cls/inc/mip.cls.i \u0026amp;Segment          \u003d ApplicationProperty\n\u0026amp;PropertyName     \u003d WorkFlow\n\u0026amp;ApplicationClass \u003d cls.mipworkflow}\u003c/p\u003e\n\u003ch4\u003eExample: Override an application class in configuration files\u003c/h4\u003e\n\u003cpre\u003e\u003ccode\u003e \u0026lt;mipapplication cApplicationCode\u003d\u0026quot;WorkFlow\u0026quot;\u0026gt;\n   \u0026lt;cApplicationClassFile\u0026gt;MIP.WorkFlow\u0026lt;/cApplicationClassFile\u0026gt;\n \u0026lt;/mipapplication\u0026gt;\n\u003c/code\u003e\u003c/pre\u003e\n\u003cp\u003e\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003cbr /\u003e\nIt is important to note that the overriding class you specify, must somewhere\nin its inheritance chain contain the object specified in the environment class.\u003c/p\u003e\n\u003ch3\u003eServices\u003c/h3\u003e\n\u003cp\u003eConfiguration information for services are captured in application classes, and\ncan potentially be overridden in the startup configuration files too.\u003c/p\u003e\n\u003ch4\u003eExample: Define a service in an application class\u003c/h4\u003e\n\u003cp\u003eThe following include file is used in an application class to define the property\nand to specify the default class that must be used to instantiate the service.\n{cls/inc/mip.cls.i \u0026amp;Segment      \u003d ServiceProperty\n\u0026amp;PropertyName \u003d cmMessage\n\u0026amp;ServiceClass \u003d cls.mipcmmessage}\u003c/p\u003e\n\u003ch4\u003eExample: Override a service class in configuration files\u003c/h4\u003e\n\u003cpre\u003e\u003ccode\u003e \u0026lt;mipapplicationservice cServiceCode\u003d\u0026quot;cmMessage\u0026quot;\u0026gt;\n   \u0026lt;cServiceClassFile\u0026gt;MIP.Communication.Message\u0026lt;/cServiceClassFile\u0026gt;\n \u0026lt;/mipapplicationservice\u0026gt;\n\u003c/code\u003e\u003c/pre\u003e\n\u003cp\u003e\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003cbr /\u003e\nIt is important to note that the overriding class you specify, must somewhere\nin its inheritance chain contain the object specified in the application class.\u003c/p\u003e\n\u003ch4\u003eExample: Specify a service as non-persistent\u003c/h4\u003e\n\u003cp\u003eNon-persistent services can be setup as follows in the configuration files.\n\u003cmipapplicationservice cServiceCode\u003d\"cmFTP\" lPersistent\u003d\"no\"/\u003e\u003c/p\u003e\n\u003ch4\u003eExample: Specify a service to be a clone of another\u003c/h4\u003e\n\u003cp\u003eA service can be setup as a clone of another service as follows in the\nconfiguration files.\n\u003cmipapplicationservice cServiceCode\u003d\"CurrentSupervisor\" cCloneOfService\u003d\"miUser\"/\u003e\u003c/p\u003e\n\u003ch4\u003eExample: Specify an alias for a service\u003c/h4\u003e\n\u003cp\u003eIn distributed environments, some modules can be configured to run on a different\nAppServer than the main application. To reduce the need for complex code to get\nmodules to respond as a unit, services can, through configuration, have their\nsetup point to another service. They can be setup as follows in the configuration\nfiles.\n\u003cmipapplicationservice cServiceCode\u003d\"camiUser\" cAliasForService\u003d\"wfmiUser\"/\u003e\u003c/p\u003e\n",
	"icon": "class",
	"superclasses": ["cls.mip", "mip.applicationfactory"],
	"subclasses": [],
	"implements": [],
	"members": [{
		"id": "property-_ApplicationRecordRowid",
		"name": "_ApplicationRecordRowid",
		"owner": "mip.applicationfactory",
		"tagname": "property",
		"datatype": "ROWID",
		"comment": "\u003cp\u003eReturns the ROWID of the mipapplication temp-table record currently in\nscope for instantiation purposes.\u003c/p\u003e\n",
		"meta": {
			"deprecated": true,
			"internal": true
		}
	}, {
		"id": "property-_ServiceRecordRowid",
		"name": "_ServiceRecordRowid",
		"owner": "mip.applicationfactory",
		"tagname": "property",
		"datatype": "ROWID",
		"comment": "\u003cp\u003eReturns the ROWID of the mipapplicationservice temp-table record currently\nin scope for instantiation purposes.\u003c/p\u003e\n",
		"meta": {
			"internal": true
		}
	}, {
		"id": "property-ServiceInitializing",
		"name": "ServiceInitializing",
		"owner": "mip.applicationfactory",
		"tagname": "property",
		"datatype": "LOGICAL",
		"comment": "\u003cp\u003eServiceInitializing indicates whether any services are currently in the\nprocess of initializing.\u003c/p\u003e\n",
		"meta": {}
	}, {
		"id": "property-EnvironmentConfigComplete",
		"name": "EnvironmentConfigComplete",
		"owner": "mip.applicationfactory",
		"tagname": "property",
		"datatype": "LOGICAL",
		"comment": "\u003cp\u003eEnvironmentConfigComplete indicates whether any processes influencing\nthe configuration of an environment has been completed.\u003c/p\u003e\n",
		"meta": {}
	}, {
		"id": "method-getApplication",
		"name": "getApplication",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eReturns the requested application object (only once we are assured that\nthe environment configuration has been completely read).\n\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003cbr /\u003e\nIf the application is not currently running, it will be started\nautomatically.\u003c/p\u003e\n\u003ch4\u003eExample\u003c/h4\u003e\n\u003cpre\u003e\u003ccode\u003e DEFINE VARIABLE oWorkFlow  AS cls.mipworkflow  NO-UNDO.\n oWorkFlow \u003d CAST(mip.applicationfactory:getApplication(\u0026quot;WorkFlow\u0026quot;:U), \u0026quot;cls.mipworkflow\u0026quot;:U).\n\u003c/code\u003e\u003c/pre\u003e\n",
		"parameters": [{
			"name": "ipcApplicationCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the application that you                             would like to have an object instance of.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "cls.mipapplication",
			"comment": "Returns an mipapplication object that can be CAST to the            correct type."
		},
		"meta": {}
	}, {
		"id": "method-_getApplication",
		"name": "_getApplication",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eThis method does all of the grunt work to instantiate the requested\napplication. It will determine if it is running and, if it is, return\nthe reference to it. If not, it will start it up, store its reference\nand then return it.\u003c/p\u003e\n",
		"parameters": [{
			"name": "ipcApplicationCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the application that you                             would like to have an object instance of.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "cls.mipapplication",
			"comment": "Returns an mipapplication object that can be CAST to the            correct type."
		},
		"meta": {
			"private": true,
			"internal": true
		}
	}, {
		"id": "method-getService",
		"name": "getService",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eReturns the requested service object (only once we are assured that\nthe environment configuration has been completely read).\n\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eIf the service is not currently running, it will be started\nautomatically.\u003c/li\u003e\n\u003cli\u003eIn case the application the service belongs to is\nnot currently running, it too will be started in the process.\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch4\u003eExample\u003c/h4\u003e\n\u003cpre\u003e\u003ccode\u003e DEFINE VARIABLE oMessage  AS cls.mipcmmessage  NO-UNDO.\n oMessage \u003d CAST(mip.applicationfactory:getService(\u0026quot;cmMessage\u0026quot;:U), \u0026quot;cls.mipcmmessage\u0026quot;:U).\n\u003c/code\u003e\u003c/pre\u003e\n",
		"parameters": [{
			"name": "ipcServiceCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the service that you would                         like to have an object instance of.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "cls.mipservice",
			"comment": "Returns an mipservice object that can be CAST to the            correct type."
		},
		"meta": {}
	}, {
		"id": "method-getCloneOfService",
		"name": "getCloneOfService",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eReturns a \u003cem\u003eclone\u003c/em\u003e (separate object instance) of the requested\nservice object (only once we are assured that the environment\nconfiguration has been completely read).\n\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eIf the service that a clone is requested for is not currently\nrunning, it will be started automatically first, and a clone\nfor it will be created. This is because they all share a\ncommon stack.\u003c/li\u003e\n\u003cli\u003eIn case the application the service to be cloned for is not\ncurrently running, it too will be started in the process.\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch4\u003eExample\u003c/h4\u003e\n\u003cpre\u003e\u003ccode\u003e DEFINE VARIABLE oMessage  AS cls.mipcmmessage  NO-UNDO.\n oMessage \u003d CAST(mip.applicationfactory:getCloneOfService(\u0026quot;cmMessage\u0026quot;:U), \u0026quot;cls.mipcmmessage\u0026quot;:U).\n\u003c/code\u003e\u003c/pre\u003e\n",
		"parameters": [{
			"name": "ipcServiceCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the service that you would                         like to have an object instance of.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "cls.mipservice",
			"comment": "Returns an mipservice object that can be CAST to the            correct type."
		},
		"meta": {}
	}, {
		"id": "method-isApplicationConfigured",
		"name": "isApplicationConfigured",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eChecks to see if we have any configuraton details for the\nrequested application.\n\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003cbr /\u003e\nRather use this method if you wanted to determine if it is\npossible to get hold of an application - without starting it.\u003c/p\u003e\n\u003ch4\u003eExample\u003c/h4\u003e\n\u003cpre\u003e\u003ccode\u003e MESSAGE mip.applicationfactory:isApplicationConfigured(\u0026quot;WarpSpeed\u0026quot;:U)\n   VIEW-AS ALERT-BOX INFO BUTTONS OK.   \n\u003c/code\u003e\u003c/pre\u003e\n",
		"parameters": [{
			"name": "ipcApplicationCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the application you                             would like to verify configuration                             details for.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "LOGICAL",
			"comment": "Returns TRUE if configuration details can be found            for the requested application."
		},
		"meta": {}
	}, {
		"id": "method-isApplicationRunning",
		"name": "isApplicationRunning",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eChecks to see if the requested application has already been started.\n\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003cbr /\u003e\nRather use this method if you wanted to determine if an application\nis already running, as opposed to checking if the application property\non the environment is valid.\u003c/p\u003e\n\u003ch4\u003eExample\u003c/h4\u003e\n\u003cpre\u003e\u003ccode\u003e MESSAGE mip.applicationfactory:isApplicationRunning(\u0026quot;WarpSpeed\u0026quot;:U)\n   VIEW-AS ALERT-BOX INFO BUTTONS OK.   \n\u003c/code\u003e\u003c/pre\u003e\n",
		"parameters": [{
			"name": "ipcApplicationCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the application that needs                             to be checked to see if it is running.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "LOGICAL",
			"comment": "Returns TRUE if requested application is already running."
		},
		"meta": {}
	}, {
		"id": "method-isServiceConfigured",
		"name": "isServiceConfigured",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eChecks to see if we have any configuraton details for the\nrequested service.\n\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003cbr /\u003e\nRather use this method if you wanted to determine if it is\npossible to get hold of a service - without starting it.\u003c/p\u003e\n\u003ch4\u003eExample\u003c/h4\u003e\n\u003cpre\u003e\u003ccode\u003e MESSAGE mip.applicationfactory:isServiceConfigured(\u0026quot;miUser\u0026quot;:U)\n   VIEW-AS ALERT-BOX INFO BUTTONS OK.   \n\u003c/code\u003e\u003c/pre\u003e\n",
		"parameters": [{
			"name": "ipcServiceCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the service you would                         like to verify configuration details for.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "LOGICAL",
			"comment": "Returns TRUE if configuration details can be found            for the requested service."
		},
		"meta": {}
	}, {
		"id": "method-isServiceRunning",
		"name": "isServiceRunning",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eChecks to see if the requested service has already been started.\n\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003cbr /\u003e\nRather use this method if you wanted to determine if a service is\nalready running, as opposed to checking if the service property\non an application is valid.\u003c/p\u003e\n\u003ch4\u003eExample\u003c/h4\u003e\n\u003cpre\u003e\u003ccode\u003e MESSAGE mip.applicationfactory:isServiceRunning(\u0026quot;wsUiService\u0026quot;:U)\n   VIEW-AS ALERT-BOX INFO BUTTONS OK.   \n\u003c/code\u003e\u003c/pre\u003e\n",
		"parameters": [{
			"name": "ipcServiceCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the service that needs                         to be checked to see if it is running.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "LOGICAL",
			"comment": "Returns TRUE if requested service is already running."
		},
		"meta": {}
	}, {
		"id": "method-trimNonPersistentServices",
		"name": "trimNonPersistentServices",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eCycles through all services currently in memory and shuts down any servives\nmarked as not being persistent. This method should be called at the end of\na request, just before the final memory checks are done.\n\u003cstrong\u003eNOTE:\u003c/strong\u003e\u003cbr /\u003e\nFor more information on how to mark a service as not persistent, please\nlook at the notes section in the documentation for this class.\u003c/p\u003e\n",
		"returns": {
			"datatype": "LOGICAL",
			"comment": "Returns TRUE once the method completes successfully."
		},
		"meta": {
			"internal": true
		}
	}, {
		"id": "method-_getApplicationClass",
		"name": "_getApplicationClass",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eLooks at the configuration information specified in the environment class,\nor overridden in the startup configuration files to determine what the\nactual class file is to use when instantiating the requested application.\u003c/p\u003e\n",
		"parameters": [{
			"name": "ipcApplicationCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the application you need to                             get the class name for.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "CHARACTER",
			"comment": "Returns the actual class name of the requested application."
		},
		"meta": {
			"private": true,
			"internal": true
		}
	}, {
		"id": "method-_getService",
		"name": "_getService",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eThis method does all of the grunt work to instantiate the requested service\n(or clone). It will determine if it is running and, if it is, return the\nreference to it. If not, it will start it up, store its reference and then\nreturn it.\u003c/p\u003e\n",
		"parameters": [{
			"name": "ipcServiceCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cpre\u003e\u003ccode\u003e   The code value of a service (or a service alias)                             that you would like to have an object instance,                             or a clone of. \n\u003c/code\u003e\u003c/pre\u003e\n"
		}, {
			"name": "iplReturnAClone",
			"datatype": "LOGICAL",
			"mode": "INPUT",
			"comment": "\u003cpre\u003e\u003ccode\u003e  An indicator of whether you would like to have a                             clone of the service specified in ipcServiceCode.                             If TRUE, a clone of the retrieved service will be                             created. \n\u003c/code\u003e\u003c/pre\u003e\n"
		}, {
			"name": "ipcServiceCodeStack",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThis routine can be called recursively from within                             itself, based on configuration. To ensure that we                             don\u0027t have a circular chain (because of aliases),                             this list will contain the services in the current                             request chain. An example of a circular chain is                             as follows: A -\u0026gt; B -\u0026gt; C -\u0026gt; A -\u0026gt; ...\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "cls.mipservice",
			"comment": "Returns an mipaservice object that can be CAST to the correct            type."
		},
		"meta": {
			"private": true,
			"internal": true
		}
	}, {
		"id": "method-_getServiceClass",
		"name": "_getServiceClass",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eLooks at the configuration information specified in the application class,\nor overridden in the startup configuration files to determine what the\nactual class file is to use when instantiating the requested service.\u003c/p\u003e\n",
		"parameters": [{
			"name": "ipoApplication",
			"datatype": "cls.mipapplication",
			"mode": "INPUT",
			"comment": "\u003cp\u003eAn instance of the application the service belongs                         to. This is needed so that we can get the details                         of the requested class, should no overriding                         information exist in the startup configuration                         files.\u003c/p\u003e\n"
		}, {
			"name": "ipcServiceCode",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe code value of the service you need to get                         the class name for.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "CHARACTER",
			"comment": "Returns the actual class name of the requested service."
		},
		"meta": {
			"private": true,
			"internal": true
		}
	}, {
		"id": "method-_getConfigDatasetBuffer",
		"name": "_getConfigDatasetBuffer",
		"owner": "mip.applicationfactory",
		"tagname": "method",
		"comment": "\u003cp\u003eCreates a record buffer to any of the configuration dataset temp-tables\nas required by the internal methods.\u003c/p\u003e\n",
		"parameters": [{
			"name": "ipcTempTable",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe name of the temp-table that we are interested                       in getting a buffer for.\u003c/p\u003e\n"
		}, {
			"name": "ipcBufferName",
			"datatype": "CHARACTER",
			"mode": "INPUT",
			"comment": "\u003cp\u003eThe name you would like to assign to the buffer.                       If it is blank or unknown, it will default to the                       name of the temp-table.\u003c/p\u003e\n"
		}],
		"returns": {
			"datatype": "HANDLE",
			"comment": "Returns a buffer object for the requested temp-table."
		},
		"meta": {
			"private": true,
			"internal": true
		}
	}, {
		"id": "temptable-mipstartpreference",
		"name": "mipstartpreference",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE mipstartpreference \n  FIELD cName AS CHARACTER\n  FIELD cArgument AS CHARACTER\n  FIELD cValue AS CHARACTER\n  INDEX idxPreference PRIMARY cName cArgument\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-mipenvironment",
		"name": "mipenvironment",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE mipenvironment \n  FIELD cEnvironmentCode AS CHARACTER\n  FIELD cEnvironmentPropath AS CHARACTER\n  FIELD cEnvironmentCustomPath AS CHARACTER\n  FIELD cBasePathApp AS CHARACTER\n  FIELD cBasePathDLC AS CHARACTER\n  FIELD cPropathCustomTokens AS CHARACTER\n  FIELD cPropathPrefix AS CHARACTER\n  FIELD cPropathSuffix AS CHARACTER\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-dynproperties",
		"name": "dynproperties",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE dynproperties \n  FIELD cEnvironmentCode AS CHARACTER\n  FIELD auto_dump_entity_cache AS LOGICAL\n  FIELD allow_anonymous_login AS LOGICAL\n  FIELD bound_icfdb AS LOGICAL\n  FIELD display_login_screen AS LOGICAL\n  FIELD image_path AS CHARACTER\n  FIELD menu_images AS CHARACTER\n  FIELD DynamicsVersion AS CHARACTER\n  FIELD ICFCM_AppServer AS CHARACTER\n  FIELD ICFCM_Database AS CHARACTER\n  FIELD ICFCM_JMS AS CHARACTER\n  FIELD ICFCM_WebService AS CHARACTER\n  FIELD IDEPalette AS CHARACTER\n  FIELD IDETemplate AS CHARACTER\n  FIELD login_procedure AS CHARACTER\n  FIELD MaxHiddenContainers AS INTEGER\n  FIELD physical_session_list AS CHARACTER\n  FIELD print_preview_preference AS CHARACTER\n  FIELD print_preview_stylesheet AS CHARACTER\n  FIELD root_directory AS CHARACTER\n  FIELD run_local AS LOGICAL\n  FIELD session_env_type AS CHARACTER\n  FIELD project_name AS CHARACTER\n  FIELD session_date_format AS CHARACTER\n  FIELD session_time_format AS CHARACTER\n  FIELD session_year_offset AS INTEGER\n  FIELD startup_procedure20 AS CHARACTER\n  FIELD startup_procedure AS CHARACTER\n  FIELD UseThinRendering AS LOGICAL\n  FIELD valid_os_list AS CHARACTER\n  FIELD _debug_tools_on AS LOGICAL\n  FIELD rule_super_procedures AS CHARACTER\n  FIELD dcr_log_path_win32 AS CHARACTER\n  FIELD dcr_log_path_unix AS CHARACTER\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-dynservices",
		"name": "dynservices",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE dynservices \n  FIELD cEnvironmentCode AS CHARACTER\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-dynservice",
		"name": "dynservice",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE dynservice \n  FIELD cEnvironmentCode AS CHARACTER\n  FIELD cServiceName AS CHARACTER\n  FIELD cServiceType AS CHARACTER\n  FIELD cPhysicalService AS CHARACTER\n  FIELD cConnectParams AS CHARACTER\n  FIELD lDefaultService AS LOGICAL\n  FIELD lCanRunLocal AS LOGICAL\n  FIELD iStartOrder AS INTEGER\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode cServiceName\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-dynmanagers",
		"name": "dynmanagers",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE dynmanagers \n  FIELD cEnvironmentCode AS CHARACTER\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-dynmanager",
		"name": "dynmanager",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE dynmanager \n  FIELD cEnvironmentCode AS CHARACTER\n  FIELD cManagerName AS CHARACTER\n  FIELD cFileName AS CHARACTER\n  FIELD cHandleName AS CHARACTER\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode cManagerName\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-mipapplications",
		"name": "mipapplications",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE mipapplications \n  FIELD cEnvironmentCode AS CHARACTER\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-mipapplication",
		"name": "mipapplication",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE mipapplication \n  FIELD cEnvironmentCode AS CHARACTER\n  FIELD cApplicationKey AS CHARACTER\n  FIELD cApplicationCode AS CHARACTER\n  FIELD cServerConnectString AS CHARACTER\n  FIELD cApplicationClassFile AS CHARACTER\n  FIELD oApplication AS Progress.Lang.Object\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode cApplicationCode\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-mipapplicationservices",
		"name": "mipapplicationservices",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE mipapplicationservices \n  FIELD cEnvironmentCode AS CHARACTER\n  FIELD cApplicationCode AS CHARACTER\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode cApplicationCode\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "temptable-mipapplicationservice",
		"name": "mipapplicationservice",
		"owner": "mip.applicationfactory",
		"tagname": "temptable",
		"definition": "DEFINE TEMP-TABLE mipapplicationservice \n  FIELD cEnvironmentCode AS CHARACTER\n  FIELD cApplicationCode AS CHARACTER\n  FIELD cServiceCode AS CHARACTER\n  FIELD cServerConnectString AS CHARACTER\n  FIELD cAliasForService AS CHARACTER\n  FIELD cBasedOnService AS CHARACTER\n  FIELD cCloneOfService AS CHARACTER\n  FIELD lPersistent AS LOGICAL INITIAL TRUE\n  FIELD cServiceClassFile AS CHARACTER\n  FIELD cConsumerStack AS CHARACTER\n  FIELD cProviderStack AS CHARACTER\n  FIELD cProviderWrapperProcedure AS CHARACTER\n  FIELD oService AS Progress.Lang.Object\n  INDEX idxEnvironmentCode PRIMARY cEnvironmentCode cApplicationCode cServiceCode\n  INDEX idxPersistent lPersistent\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "dataset-dsMipXmlConfig",
		"name": "dsMipXmlConfig",
		"owner": "mip.applicationfactory",
		"tagname": "dataset",
		"definition": "DEFINE DATASET dsMipXmlConfig FOR mipstartpreference, mipenvironment, dynproperties, dynservices, dynservice, dynmanagers, dynmanager, mipapplications, mipapplication, mipapplicationservices, mipapplicationservice\n",
		"comment": "",
		"meta": {}
	}, {
		"id": "property-mipEnv",
		"name": "mipEnv",
		"owner": "cls.mip",
		"tagname": "property",
		"datatype": "cls.mipenvironment",
		"comment": "",
		"meta": {}
	}, {
		"id": "property-PrivateData",
		"name": "PrivateData",
		"owner": "cls.mip",
		"tagname": "property",
		"datatype": "CHARACTER",
		"comment": "",
		"meta": {}
	}, {
		"id": "property-mipEnvStatic",
		"name": "mipEnvStatic",
		"owner": "cls.mip",
		"tagname": "property",
		"datatype": "cls.mipenvironment",
		"comment": "",
		"meta": {}
	}],
	"meta": {
		"deprecated": true,
			"internal": true
	}
});