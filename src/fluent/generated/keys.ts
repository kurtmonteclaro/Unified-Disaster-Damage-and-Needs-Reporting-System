import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '5ca7ce9e0f10c3107e504bc530d1b2d0': {
                        table: 'sys_scope_privilege'
                        id: '5ca7ce9e0f10c3107e504bc530d1b2d0'
                    }
                    '90a706de0f10c3107e504bc530d1b2a8': {
                        table: 'sys_scope_privilege'
                        id: '90a706de0f10c3107e504bc530d1b2a8'
                    }
                    acl_disaster_report_all_access: {
                        table: 'sys_security_acl'
                        id: 'eb256bd3cc2b4a918fa6706753a4b576'
                        deleted: true
                    }
                    acl_disaster_report_create: {
                        table: 'sys_security_acl'
                        id: '9d373d70fe964c278bd5cd87165f27e5'
                        deleted: false
                    }
                    acl_disaster_report_delete: {
                        table: 'sys_security_acl'
                        id: '3f2cc65e55f4439cb8d3f54ef229fa88'
                        deleted: false
                    }
                    acl_disaster_report_read: {
                        table: 'sys_security_acl'
                        id: '3489c1940f50438bacc96f646e1edff8'
                        deleted: false
                    }
                    acl_disaster_report_update: {
                        table: 'sys_security_acl'
                        id: '423689d4ed05407d96be9ef969347dc8'
                        deleted: true
                    }
                    acl_disaster_report_verification: {
                        table: 'sys_security_acl'
                        id: '67451253123e4abeb325968f5e593766'
                        deleted: true
                    }
                    acl_disaster_report_write: {
                        table: 'sys_security_acl'
                        id: 'af3980fa960848c487d5c472beadfb3a'
                    }
                    admin_separator: {
                        table: 'sys_app_module'
                        id: '7cc732f36e784b4d86cc395016da6899'
                    }
                    analytics_dashboard: {
                        table: 'sys_app_module'
                        id: '10a7d0cb9db54731874e96edab7b34e3'
                    }
                    analytics_separator: {
                        table: 'sys_app_module'
                        id: 'c0fc818127044cc3bd9336223c65380f'
                    }
                    api_rate_limit_prop: {
                        table: 'sys_properties'
                        id: '73f1eff882dd49959549c726ab3075a9'
                    }
                    auto_priority_prop: {
                        table: 'sys_properties'
                        id: '493dc2d4e167444ca014d0466de0148f'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'bcf310bd032b486b9f08c6fd6f616889'
                    }
                    br_calculate_priority: {
                        table: 'sys_script'
                        id: '61cd7cba8cb44d188a4518f24fa1f6cf'
                        deleted: true
                    }
                    br_generate_report_number: {
                        table: 'sys_script'
                        id: '48a182ec63784406bcfbd1818283078a'
                        deleted: true
                    }
                    br_notify_high_priority: {
                        table: 'sys_script'
                        id: '409d653a8eaf44719da381a2f5e1063e'
                    }
                    br_validate_location: {
                        table: 'sys_script'
                        id: 'b1b0e9d6a7c44813ac6bc3135745eccb'
                        deleted: true
                    }
                    br_verification_workflow: {
                        table: 'sys_script'
                        id: '31eff0de3b45455099aa96f3ddcb6ebe'
                        deleted: true
                    }
                    critical_reports: {
                        table: 'sys_app_module'
                        id: '0624c8b5366d4b82957368f41e9fe11b'
                    }
                    default_region_prop: {
                        table: 'sys_properties'
                        id: '166ed247649542318ceee35fe2dda685'
                    }
                    disaster_category: {
                        table: 'sys_app_category'
                        id: '7c4358883e6c46dfb597cfe813cee3cd'
                    }
                    disaster_report_api: {
                        table: 'sys_ws_definition'
                        id: '1e86224b9076470ba322830d875981aa'
                    }
                    disaster_report_api_v1: {
                        table: 'sys_ws_version'
                        id: '163be703c1e447ae818864882cd1560b'
                    }
                    disaster_report_list: {
                        table: 'sys_ws_operation'
                        id: 'e36545764db8406db327d687a3a20b6d'
                    }
                    disaster_reports_list: {
                        table: 'sys_app_module'
                        id: '118c9114354e443fa5d3421765f59ac8'
                    }
                    geo_validation_prop: {
                        table: 'sys_properties'
                        id: '80d491f451784e0b87f4ec5958e25125'
                    }
                    max_reports_prop: {
                        table: 'sys_properties'
                        id: '617e17eaf29547a0917b9d7dc2cb1a55'
                    }
                    multimedia_max_size_prop: {
                        table: 'sys_properties'
                        id: '859b6e48e20641dcb1c00199f11c8526'
                    }
                    notification_enabled_prop: {
                        table: 'sys_properties'
                        id: '81b0ee4423734ee1ba1f15cf008bcbf4'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '0e5980d6fed0455db9254435f461d685'
                    }
                    pending_verification: {
                        table: 'sys_app_module'
                        id: 'e95a5d9c93fe46a888f9bfb07defefef'
                    }
                    role_management: {
                        table: 'sys_app_module'
                        id: '0f8d93316db74e6eaec88b9bc90856ac'
                    }
                    'src_server_disaster-report-api_js': {
                        table: 'sys_module'
                        id: '2c3ce67c06404576bf2e59b7acbdfa7f'
                    }
                    'src_server_disaster-report-validation_js': {
                        table: 'sys_module'
                        id: '2548e91da8374ea9ab3f1e49f40f6afa'
                    }
                    'src_server_verification-workflow_js': {
                        table: 'sys_module'
                        id: '0f40cf50dae640d6877755bbf34953f2'
                    }
                    submit_report: {
                        table: 'sys_app_module'
                        id: '054e197ecfa84cb18f3d8278994497e9'
                    }
                    system_properties: {
                        table: 'sys_app_module'
                        id: 'e854c411cbb045488ad468ab33757b6d'
                    }
                    uddnrs_menu: {
                        table: 'sys_app_application'
                        id: 'dddc87b25af846479614bef8f0c6fcba'
                    }
                    verification_auto_assign_prop: {
                        table: 'sys_properties'
                        id: '109211191a964b3fb82088c5fbedf63d'
                    }
                    verification_separator: {
                        table: 'sys_app_module'
                        id: '190d2f4b75034fac8ed1b94ea127d13d'
                    }
                }
                composite: [
                    {
                        table: 'sys_dictionary'
                        id: '01c8a31306c14203810fd6a4e92a6867'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '01f876d6a6dd4e3786dba5f1213c06ad'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'shelter_needed'
                            value: 'no'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '047e6c5ac4764f2a84c1f93caf1d1a44'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '04d7b6cb624f4dfda43c0e4a7efa7d5c'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'injured'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '04f894a634fc478b9bf3fd9f06c99243'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'infrastructure'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '06302e88a42e4b2496662552de131eca'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'volcanic_eruption'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0656e696b96b4d5787cb6bbf23aea983'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_type'
                            value: 'national_agency'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0899cf681abe4d979c5dd0ace03840bc'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a727c8ce564456f92c0faccc3dbfc9b'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'affected_households'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0ff4595993a1417197e94f4e2788500b'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'contact_number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '105eef30311f41e084c2f1228268d619'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'medical_assistance_needed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '11169551012b49f28621e9cd4bcf75d6'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_role'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '125c027b7fe74fb182a348ad1f22520a'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '13266e676817496cb42180c0abdce6dd'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '147a51c74d2644978a5e7b54afcb41cf'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_role'
                            value: 'citizen'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '150beff5fa9049a3916e1b94fd8aecd7'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '15cfd6fa1ecd444b8e46e997bf9ed5cc'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'response_status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '16a6428052814cf49246d7e036f556c5'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_8'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1888ff1aa22f4451a0449c5955da254b'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'flood'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1976e4f1da6f48299570a342b28aea03'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ae89c7fbd6347c59208bb3eeaa74cbd'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'municipality'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c54b41ac8814f0ebba52ae3c1222a53'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c7e19feaa4f406cb7cf94c6c3ac7eb9'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'medical_assistance_needed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1df21562e7ce4dfda1c05a26b448e009'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'location_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1e3c4b4c4cc847a7bce78eb466562d9b'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'status'
                            value: 'closed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1e54cd8f4f2c4a5bb6c0543103f10aa0'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1f2b9f8468cc4dbfad57ab1b911cbce3'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'response_status'
                            value: 'no_response'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '217faee7dc474f5fa59d1afb96333ff9'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'affected_individuals'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '21ad954c71564be496d17f459b22c512'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '21d13d28817b45c185a2fcd7697662dc'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'immediate_needs'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '24681b0412ef41a5ac994cbfb36cca33'
                        deleted: true
                        key: {
                            sys_security_acl: '3f2cc65e55f4439cb8d3f54ef229fa88'
                            sys_user_role: {
                                id: '3395eccc23db429abbfbf2d50d1d2e83'
                                key: {
                                    name: 'x_2002275_unified.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '27792bba8f1f4beb96c91125225e3b19'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'people_affected'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '2803f638c7474ba089e96cd2c7a2194e'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '294c1187740b40eca114ce3e10856fb5'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'medical_assistance_needed'
                            value: 'yes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e1c7164b37b4ea391263c1d87890e31'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2e79aee56205431cabf591cd02d0bc18'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'food_needed'
                            value: 'no'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2f72a89b1b2649a3ac345da42e68f51b'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_status'
                            value: 'verified'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '2f7cca09e43c47d882a5e181c0c2e9c2'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_severity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2fbf3a70de6a4d63b8259e17759aef68'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'deaths'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '30934a05e2fe4092ac72fa5031f9054c'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'water_needed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '313f18fe1f274a1f8d89ac7275df5292'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_4a'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '332a8b41df274c9593713dd8b36378fd'
                        deleted: true
                        key: {
                            sys_security_acl: '3489c1940f50438bacc96f646e1edff8'
                            sys_user_role: {
                                id: 'bd924c0c79094a27a8dcd83e505e264d'
                                key: {
                                    name: 'x_2002275_unified.citizen_reporter'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '3395eccc23db429abbfbf2d50d1d2e83'
                        key: {
                            name: 'x_2002275_unified.admin'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '33cb78822438403a9242707c163f264d'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'longitude'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '35a14af4158544e9911bad78bc6256a2'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'city_municipality'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '35d303f717f6404da10d2caea5c1ba4f'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'priority_level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '38ad0c00b748490cad141a43b5bb4add'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verified_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '38ba0c8b644a4eacaee9b9b2d536eb7a'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '39b11fc17a28400a82913694e9785dcb'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'typhoon'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3bb7676095144c09b5641927b68e2cc3'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3e793344efab489daa19f312728f184c'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'flood'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3f7bcb6a1b614201ae6e97ce218a71b7'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'barangay'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '40e96b4fef384a6db61681cdf96a2d55'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'has_multimedia'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '42672458a7964b20890495291200cf56'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'response_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '43684d3bdf84449bb3669caafefff6dd'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '43bb2e278546416ab651f07c76241786'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '457857609868459c9ba64df46012da36'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'tornado'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4761efdca03f45a8a2f84e9f6b9c4061'
                        deleted: true
                        key: {
                            sys_security_acl: '67451253123e4abeb325968f5e593766'
                            sys_user_role: {
                                id: '3395eccc23db429abbfbf2d50d1d2e83'
                                key: {
                                    name: 'x_2002275_unified.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '485bdbe4d77c4fcc868ee5c4c3a0c7bc'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'water_needed'
                            value: 'no'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '487eba5dcd8746dfa1fb3ff2820b8ae9'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '488428b84997461289f75ac7e80ccd9d'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '49f3069d42f345ea882d076a424cf53a'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_type'
                            value: 'citizen'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4a6c4701ffd64c5793735644f2882f4f'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_type'
                            value: 'lgu_officer'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '4a708cbe8da245d8ae3b56e9be44a3e7'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '4af8ecf68b6b4e6aba3db1252f0e3bf7'
                        key: {
                            name: 'x_2002275_unified/main.js.map'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4cc604de434646ecbc13b44b739e0fad'
                        deleted: true
                        key: {
                            sys_security_acl: '9d373d70fe964c278bd5cd87165f27e5'
                            sys_user_role: {
                                id: '637c8116a7174973aa7b60f5c68c97d7'
                                key: {
                                    name: 'x_2002275_unified.lgu_officer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '50b6381920034027b665c3ccb08200b4'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'fire'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '50f1864a1e3c4016943c6de954bf84d3'
                        deleted: true
                        key: {
                            sys_security_acl: '423689d4ed05407d96be9ef969347dc8'
                            sys_user_role: {
                                id: '637c8116a7174973aa7b60f5c68c97d7'
                                key: {
                                    name: 'x_2002275_unified.lgu_officer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5244f359331649128e927fad8afb1151'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'landslide'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '544b5097db1d4aeb8fcd84d8fea0e2b2'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'shelter_needed'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '55899a00e9c744caa519b2255c4e7b34'
                        deleted: true
                        key: {
                            sys_security_acl: '9d373d70fe964c278bd5cd87165f27e5'
                            sys_user_role: {
                                id: 'dfb3b6fec03542a48a37c75b454fe53c'
                                key: {
                                    name: 'x_2002275_unified.national_agency'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '571d613e0d7c4a8e93c705b5bd8bdacd'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_4b'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '57262e5121764f4ba16bcefdf9846989'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'priority_level'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '58085f34ab064276a4e2cdab26ac205d'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'medical_assistance_needed'
                            value: 'no'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '598f5a48a08844178a5486e8e1997bf8'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_role'
                            value: 'lgu_officer'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5ab3f950a7f4414da6c4126a60d75844'
                        deleted: true
                        key: {
                            sys_security_acl: '423689d4ed05407d96be9ef969347dc8'
                            sys_user_role: {
                                id: '3395eccc23db429abbfbf2d50d1d2e83'
                                key: {
                                    name: 'x_2002275_unified.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '5b1232d7755043e7aeba660a2dab9231'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5be3497adbf54b4788de365cd8f6e289'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'food_needed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5c7176fb54d7488ca578b74c474fff16'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_role'
                            value: 'national_agency'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5c77cdf2699246f9ae1b6103671960be'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'deaths'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5c7844536a134039b781482c203e4f6e'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'province'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5cc545436c164eeea22fbd1bf8a7c058'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_severity'
                            value: 'minimal'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '600f09378d2d498190f88ff11bc650f5'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_7'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '60c749ff981943c4bbb4de93491fc2b5'
                        deleted: true
                        key: {
                            sys_security_acl: '423689d4ed05407d96be9ef969347dc8'
                            sys_user_role: {
                                id: 'dfb3b6fec03542a48a37c75b454fe53c'
                                key: {
                                    name: 'x_2002275_unified.national_agency'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '60d4c8eef6cc453abae7f9773ed936d7'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '637c8116a7174973aa7b60f5c68c97d7'
                        key: {
                            name: 'x_2002275_unified.lgu_officer'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '65ca2466806d43289fa17c22dfa28803'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'priority_level'
                            value: 'critical'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '66d964fbb05749288ed7b3a5be3a2c02'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'storm_surge'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6afafcc2cc5142489969c43ece1136c1'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'latitude'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6bf4db72b7bf429cbf7a96a8d3dcaa0f'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'fire'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6bfb85ba8f03470bb9d36636486fd445'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6d8300277a4b45c99c29678f4b6f07fe'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e63ecb994274d4db6def99dd4294ca2'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6f5fb33022e340fcb5ab5ffecf390143'
                        deleted: true
                        key: {
                            sys_security_acl: '67451253123e4abeb325968f5e593766'
                            sys_user_role: {
                                id: '637c8116a7174973aa7b60f5c68c97d7'
                                key: {
                                    name: 'x_2002275_unified.lgu_officer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '71a8767e9fad4fd2a858645f8ed541ff'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '71fbab7666dd46528513361264782392'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '730ea6466ce041848c48240d2de4e23a'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'location_description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '74513ca65fc54f2db1f236a756ee853d'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '74ab8517f72d4ed69ff709e773205ce4'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_9'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '74f414c816a944de9218d1bf9fd8ee04'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '75ca8f526e7c4a13ac72e992864afc7e'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '767b1610a98346be9e7b1895915c07e2'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'longitude'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7c4e5ac94a7240d29422d47cf0383845'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'incident_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7dd7b588a1b14910887098840ff1de42'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'houses_damaged'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7e4b5478fbb246709c3b144b76933bd7'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reported_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '81580aab03c9401fbe0d28896219be51'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'water_needed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '842dd1afbca34dddb0c42f19021a946b'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'status'
                            value: 'new'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '852588a7c224457b9740b4b250cbc64b'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '859641bc01044b9097427288dead032d'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'affected_households'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '86a638c6c03a4ad58538b34929fb514c'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'environmental'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '86b43c6162954cb2b398d1fd76ae2354'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '87068f045dda48cb86152afe70fa8819'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_12'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '876335b932d24a598059d2e7a0ea15bf'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_notes'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '87a2cd9658334693b421dbb1ad23db7f'
                        deleted: true
                        key: {
                            sys_security_acl: '9d373d70fe964c278bd5cd87165f27e5'
                            sys_user_role: {
                                id: 'bd924c0c79094a27a8dcd83e505e264d'
                                key: {
                                    name: 'x_2002275_unified.citizen_reporter'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '885554589b1a45738b77beef2e6ea994'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'food_needed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '889fec193b474dc6931dc801f13e1f39'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'severity'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8937bf684c7643c1979be552f8eadc12'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'severity'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '89688269c618441595f43643bbef443b'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_severity'
                            value: 'moderate'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8990955cc69f4c75a327aa5026224c8c'
                        deleted: true
                        key: {
                            sys_security_acl: '67451253123e4abeb325968f5e593766'
                            sys_user_role: {
                                id: 'dfb3b6fec03542a48a37c75b454fe53c'
                                key: {
                                    name: 'x_2002275_unified.national_agency'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '89fa7cf62a064cd89ef64443d5972781'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'earthquake'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8f221f82bb56454c9e4421548e693dc6'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_role'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '924d4e900b4b41a3b7caaa5709f67634'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'water_needed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9371f73a30264dcc9ae137d030e63cc8'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'food_needed'
                            value: 'yes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '939b8bb9bc904da19e3382876e958366'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'landslide'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '943da477e4f94df5860bf139ecc7593a'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'affected_individuals'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '96a65ff44fb34ff299152d85eac70c52'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'response_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '96edd1d0c17b4b97af666b18c58951ef'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'province'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '98342da192bc47958f560b27c911ddc5'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'other'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9846e95902114d5a96d2f1d37fb893b6'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'priority_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '99b5069a5e70401182691a96f736f9f7'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_severity'
                            value: 'severe'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9c44c25cb3ff4875a34e068521e30109'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'medical_assistance_needed'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '9e5b1cab43014efca62a39a2d4c92800'
                        key: {
                            category: 'x_2002275_unified_disaster_report'
                            prefix: 'DR'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9f33c45b5490458ead4df58fddd8cb0c'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9f78903c17c6498f9adc4a66dc510136'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'response_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9fd7299c771543a099c24fa78d7e12f6'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'structural'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a0215e66116e4237a29c50bf5cb23799'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'houses_damaged'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a3ed765945704d739aa36313124d7330'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a5a122dd0aa74a01bd2a047f5f37880c'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_description'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a71bf39135d14a0b8dfc630f5a54ba18'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'food_needed'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a875155d419146cbb132ab573cfa7f63'
                        deleted: true
                        key: {
                            sys_security_acl: '3489c1940f50438bacc96f646e1edff8'
                            sys_user_role: {
                                id: '637c8116a7174973aa7b60f5c68c97d7'
                                key: {
                                    name: 'x_2002275_unified.lgu_officer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a9e3e80ab37c4cbfae1f83563d661090'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'water_needed'
                            value: 'yes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'abc9a98350df4f049ec7021989c79ffb'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'municipality'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ac9cb13bc2e64cb292ff0590b5c53555'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_10'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b07f1d88551245d5b76343d9835bb181'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'people_affected'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b533b10fb46041be98833c7ac1e4b2f3'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b5614681bad947de8cf39e04fd2661c7'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_status'
                            value: 'rejected'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b742dfb9aaa34717a2c60f22ba6a2be3'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'shelter_needed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b7db219b94144d0c8f795a88da86de64'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_contact'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b8eb5d7fba6f4837b95e579479828434'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'address'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'bd924c0c79094a27a8dcd83e505e264d'
                        key: {
                            name: 'x_2002275_unified.citizen_reporter'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c119a46cf97b4899a6c4adae64ea64bd'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'displacement'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c29cb50a6ef148cf8f03da0eb9753dec'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'contact_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c3f3587cddde4ad79b8a85073ddb459c'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c409e23121fd4ea5a02ec40171659644'
                        deleted: true
                        key: {
                            sys_security_acl: '9d373d70fe964c278bd5cd87165f27e5'
                            sys_user_role: {
                                id: '3395eccc23db429abbfbf2d50d1d2e83'
                                key: {
                                    name: 'x_2002275_unified.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4c06190aa084ce4946f43da6b0cc2aa'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reported_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c690507bc1754296b913f0a6397a8be1'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_contact'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c82dbf5066a24569990f163234a2a077'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c8b057a1bd1647efb386cf5f9e87da2e'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'severity'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c9c9cbe4fb234e3f8cc98fadcd8c4fdf'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'ncr_national_capital_region'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'cb18ce1eb7e8452db2ad9e4d59cc7800'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'response_status'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'ccedc3434279445ca695771774fa4b68'
                        key: {
                            name: 'x_2002275_unified/main'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'cd847f5931474e41a11590b5bf55e03f'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ce2cbe5933d44d72b3ebfe42a322496e'
                        deleted: true
                        key: {
                            sys_security_acl: '3489c1940f50438bacc96f646e1edff8'
                            sys_user_role: {
                                id: '3395eccc23db429abbfbf2d50d1d2e83'
                                key: {
                                    name: 'x_2002275_unified.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd0ddd936af364db29fd35185bd694b0e'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd13fcd159ade4be9be4e004e68180f24'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'car'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd1867de3349e404a8585d7769d960849'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'response_status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd27398626e3949a29a7041f5611d60d1'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'priority_level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd2ba466316234e408e8257993058197c'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'incident_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd598763cfed5408ba04082ebb250d642'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'city_municipality'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd616e35d57c349f99eed223b3e7b3415'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd80f911244cb4fcd944ea26fa1cfdb7b'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_severity'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd922219a06634478a35c14b50b500f57'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_role'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd981aef962ba4d16b0f0a572b33269d4'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'shelter_needed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dfa5def4e2494f12b9a0eaf4bac913b6'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'injured'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'dfb3b6fec03542a48a37c75b454fe53c'
                        key: {
                            name: 'x_2002275_unified.national_agency'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e00c064a15bc4c3dbea0917685110673'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'barangay'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e0278b36e0e5400684b2807546e80e86'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_13'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e115082d008d4999b61d44d7023e7db0'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'response_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e14b8b4f4f1648839f378cc4582bf9e5'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e18da9bd49ef468d86d45f3cb6f97e50'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'reporter_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e1e8d367e9dc460fa88840509452c49c'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'priority_level'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e29267bb21184da5abe03e9d36564ef4'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e4b1b6024f5c416da4072e68727566fd'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e5c1d582dbb843f28041c67b602238d8'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'immediate_needs'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e6deee1925bd49edb8b647a2ac3b4769'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e7c33c1e1d024d6aa78a91131b874928'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verification_status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e7ea6b43a05549488b3240caea792301'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'livelihood'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e9c26f55b74b4fd0bbe6840d493d0f2d'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ebaa0c2c8c0b4c7486b1c6f9cf9c97f6'
                        deleted: true
                        key: {
                            sys_security_acl: '3489c1940f50438bacc96f646e1edff8'
                            sys_user_role: {
                                id: 'dfb3b6fec03542a48a37c75b454fe53c'
                                key: {
                                    name: 'x_2002275_unified.national_agency'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ed54ced3057744959452d1acc2db4b0f'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'has_multimedia'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ee0df04717664c5eae95375515d55084'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'casualties'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'ee31a0450d904bb4b805cc879ffdcdec'
                        key: {
                            endpoint: 'x_2002275_unified_uddnrs_portal.do'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ef7d790acb0d4419a1c6da165597c625'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'priority_level'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f02efaac7b4e425a9f3c4d2b350881b8'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_severity'
                            value: 'catastrophic'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f059eaf1b36b4bb18e6db7866f8c7424'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'disaster_type'
                            value: 'drought'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f17f3f9ecf7c4cb896f85354b9464ce8'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'region_11'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f43f8c4cb6e94e1c97ace9d805bd0204'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'shelter_needed'
                            value: 'yes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f509d7a275724b279b2054f0240ee4c2'
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'region'
                            value: 'barmm'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fafa125bf8b5499e8b5ba49480113020'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'agricultural'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fcdba1f585424276aade7271a21334ca'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'verified_by'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fd230044aceb4ffdac3f242b599cf1fc'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'damage_type'
                            value: 'earthquake'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'feaebc46214f49d2898e89dcc5dbeb7d'
                        deleted: true
                        key: {
                            name: 'x_2002275_unified_disaster_report'
                            element: 'latitude'
                        }
                    },
                ]
            }
        }
    }
}
