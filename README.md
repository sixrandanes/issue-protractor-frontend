# issue-protractor-frontend

Project aims to reproduce the bug found with protractor.

Librairies used : 
- node@6.6.0
- angular2@2.0.0
- ngrx
- protractor@4.0.8
- chrome@53
- angular-cli@1.0.0-beta.10 (system.js)

Step to reproduce the problem :
>> npm i
>> ng serve

Before launching protractor, ensure the backend is already launched.

1/ First case : should be KO
>> ng e2e : tests result KO (with http request via @ngrx (store, actions, effects, reducers, ...))

2/ Second case : should be OK
Go to pays-list.page.component.ts, comment line 38 (this.search)
>> ng e2e : tests result OK (no http request)
