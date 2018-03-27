import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Domain } from '../shared/models/domain.model';
import { Credential } from '../shared/models/credential.model';

@Injectable()
export class DomainService {

  constructor(private http: HttpClient) { }

  getDomains(user): Observable<Domain[]> {
    return this.http.get<Domain[]>('/api/domains/' + user);
  }

  countDomains(): Observable<number> {
    return this.http.get<number>('/api/domains/count');
  }

  addDomain(domain: Domain): Observable<Domain> {
    return this.http.post<Domain>('/api/domain', domain);
  }

  getDomain(domain: Domain): Observable<Domain> {
    return this.http.get<Domain>(`/api/domain/${domain._id}`);
  }

  getDomainByUser(userdomain): Observable<Domain> {
    return this.http.get<Domain>('/api/domain/get/' + userdomain);
  }

  editDomain(domain: Domain): Observable<string> {
    return this.http.put(`/api/domain/${domain._id}`, domain, { responseType: 'text' });
  }

  deleteDomain(domain: Domain): Observable<string> {
    return this.http.delete(`/api/domain/${domain._id}`, { responseType: 'text' });
  }

  getCredentials(userdomain): Observable<Credential[]> {
    return this.http.get<Credential[]>('/api/credentials/' + userdomain);
  }

  countCredentials(): Observable<number> {
    return this.http.get<number>('/api/credentials/count');
  }

  addCredentials(credential: Credential): Observable<Credential> {
    return this.http.post<Credential>('/api/credential', credential);
  }

  getCredential(credential: Credential): Observable<Credential> {
    return this.http.get<Credential>(`/api/credential/${credential._id}`);
  }

  editCredential(credential: Credential): Observable<string> {
    return this.http.put(`/api/credential/${credential._id}`, credential, { responseType: 'text' });
  }

  deleteCredential(credential: Credential): Observable<string> {
    return this.http.delete(`/api/credential/${credential._id}`, { responseType: 'text' });
  }
}
