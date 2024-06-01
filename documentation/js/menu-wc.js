'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">reggie documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-5ed42e9827d40e1698ad00097f337d8d2372d0d3ac5d09bb9f9c0ad4cdc7b25776a1875bf31a46d9de98041e85efc52622f0651005676f97e35033849353b710"' : 'data-bs-target="#xs-controllers-links-module-AppModule-5ed42e9827d40e1698ad00097f337d8d2372d0d3ac5d09bb9f9c0ad4cdc7b25776a1875bf31a46d9de98041e85efc52622f0651005676f97e35033849353b710"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-5ed42e9827d40e1698ad00097f337d8d2372d0d3ac5d09bb9f9c0ad4cdc7b25776a1875bf31a46d9de98041e85efc52622f0651005676f97e35033849353b710"' :
                                            'id="xs-controllers-links-module-AppModule-5ed42e9827d40e1698ad00097f337d8d2372d0d3ac5d09bb9f9c0ad4cdc7b25776a1875bf31a46d9de98041e85efc52622f0651005676f97e35033849353b710"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-5ed42e9827d40e1698ad00097f337d8d2372d0d3ac5d09bb9f9c0ad4cdc7b25776a1875bf31a46d9de98041e85efc52622f0651005676f97e35033849353b710"' : 'data-bs-target="#xs-injectables-links-module-AppModule-5ed42e9827d40e1698ad00097f337d8d2372d0d3ac5d09bb9f9c0ad4cdc7b25776a1875bf31a46d9de98041e85efc52622f0651005676f97e35033849353b710"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-5ed42e9827d40e1698ad00097f337d8d2372d0d3ac5d09bb9f9c0ad4cdc7b25776a1875bf31a46d9de98041e85efc52622f0651005676f97e35033849353b710"' :
                                        'id="xs-injectables-links-module-AppModule-5ed42e9827d40e1698ad00097f337d8d2372d0d3ac5d09bb9f9c0ad4cdc7b25776a1875bf31a46d9de98041e85efc52622f0651005676f97e35033849353b710"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoryModule-1227d51ad9fbccc116c6ac2124dc1af3b0c5f7680b8390b5ba0320cd080b485ca237eea89557fa6d7c997b279172d076576ccc28570736a6128fbb384ad0a37c"' : 'data-bs-target="#xs-controllers-links-module-CategoryModule-1227d51ad9fbccc116c6ac2124dc1af3b0c5f7680b8390b5ba0320cd080b485ca237eea89557fa6d7c997b279172d076576ccc28570736a6128fbb384ad0a37c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-1227d51ad9fbccc116c6ac2124dc1af3b0c5f7680b8390b5ba0320cd080b485ca237eea89557fa6d7c997b279172d076576ccc28570736a6128fbb384ad0a37c"' :
                                            'id="xs-controllers-links-module-CategoryModule-1227d51ad9fbccc116c6ac2124dc1af3b0c5f7680b8390b5ba0320cd080b485ca237eea89557fa6d7c997b279172d076576ccc28570736a6128fbb384ad0a37c"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoryModule-1227d51ad9fbccc116c6ac2124dc1af3b0c5f7680b8390b5ba0320cd080b485ca237eea89557fa6d7c997b279172d076576ccc28570736a6128fbb384ad0a37c"' : 'data-bs-target="#xs-injectables-links-module-CategoryModule-1227d51ad9fbccc116c6ac2124dc1af3b0c5f7680b8390b5ba0320cd080b485ca237eea89557fa6d7c997b279172d076576ccc28570736a6128fbb384ad0a37c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-1227d51ad9fbccc116c6ac2124dc1af3b0c5f7680b8390b5ba0320cd080b485ca237eea89557fa6d7c997b279172d076576ccc28570736a6128fbb384ad0a37c"' :
                                        'id="xs-injectables-links-module-CategoryModule-1227d51ad9fbccc116c6ac2124dc1af3b0c5f7680b8390b5ba0320cd080b485ca237eea89557fa6d7c997b279172d076576ccc28570736a6128fbb384ad0a37c"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmployeeModule-b211c2d234c67e66d2ab10956f23bcb67def55fa952548d49f3bb156f31fcbd7505f03d7be5cf3b0293b4f0c3f5a8af420cd604d001512ac587228590de66ab3"' : 'data-bs-target="#xs-controllers-links-module-EmployeeModule-b211c2d234c67e66d2ab10956f23bcb67def55fa952548d49f3bb156f31fcbd7505f03d7be5cf3b0293b4f0c3f5a8af420cd604d001512ac587228590de66ab3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmployeeModule-b211c2d234c67e66d2ab10956f23bcb67def55fa952548d49f3bb156f31fcbd7505f03d7be5cf3b0293b4f0c3f5a8af420cd604d001512ac587228590de66ab3"' :
                                            'id="xs-controllers-links-module-EmployeeModule-b211c2d234c67e66d2ab10956f23bcb67def55fa952548d49f3bb156f31fcbd7505f03d7be5cf3b0293b4f0c3f5a8af420cd604d001512ac587228590de66ab3"' }>
                                            <li class="link">
                                                <a href="controllers/EmployeeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeModule-b211c2d234c67e66d2ab10956f23bcb67def55fa952548d49f3bb156f31fcbd7505f03d7be5cf3b0293b4f0c3f5a8af420cd604d001512ac587228590de66ab3"' : 'data-bs-target="#xs-injectables-links-module-EmployeeModule-b211c2d234c67e66d2ab10956f23bcb67def55fa952548d49f3bb156f31fcbd7505f03d7be5cf3b0293b4f0c3f5a8af420cd604d001512ac587228590de66ab3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeModule-b211c2d234c67e66d2ab10956f23bcb67def55fa952548d49f3bb156f31fcbd7505f03d7be5cf3b0293b4f0c3f5a8af420cd604d001512ac587228590de66ab3"' :
                                        'id="xs-injectables-links-module-EmployeeModule-b211c2d234c67e66d2ab10956f23bcb67def55fa952548d49f3bb156f31fcbd7505f03d7be5cf3b0293b4f0c3f5a8af420cd604d001512ac587228590de66ab3"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoryController.html" data-type="entity-link" >CategoryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmployeeController.html" data-type="entity-link" >EmployeeController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Employee.html" data-type="entity-link" >Employee</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BackVo.html" data-type="entity-link" >BackVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDto.html" data-type="entity-link" >UpdateDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link" >CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeService.html" data-type="entity-link" >EmployeeService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});