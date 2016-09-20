import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { IldaGridService } from './ilda-grid.service';
import { StoreModule } from '@ngrx/store';
import { GridInfo } from '../grid-info';

describe('IldaGridService Tests', () => {

  let testObject, connection, backend;

  const responseObject1 = {
    '_embedded': {
      'unites': ['resultats'],
    },
    '_links': {
      'first': {
        'href': 'link_to_first'
      },
      'prev': {
        'href': 'link_to_prev'
      },
      'self': {
        'href': 'link_to_self'
      },
      'next': {
        'href': 'link_to_next'
      },
      'last': {
        'href': 'link_to_last'
      }
    },
    'pages': {
      'size': 10,
      'totalElements': 30,
      'totalPages': 3,
      'number': 1
    }
  };

  const responseObject2 = {
    '_embedded': {
      'unites': ['resultats'],
    },
    '_links': {
      'first': {
        'href': 'link_to_first'
      },
      'prev': {
        'href': 'link_to_prev'
      },
      'self': {
        'href': 'link_to_self'
      },
      'next': {
        'href': 'link_to_next'
      },
      'last': {
        'href': 'link_to_last'
      }
    },
    'pages': {
      'size': 10,
      'totalElements': 30,
      'totalPages': 3,
      'number': 1
    }
  };

  const responseObject3 = {
    '_embedded': {
      'unites': ['resultats'],
    },
    '_links': {
      'first': {
        'href': 'link_to_first'
      },
      'prev': {
        'href': 'link_to_prev'
      },
      'self': {
        'href': 'link_to_self'
      },
      'next': {
        'href': 'link_to_next'
      },
      'last': {
        'href': 'link_to_last'
      }
    },
    'pages': {
      'size': 10,
      'totalElements': 30,
      'totalPages': 3,
      'number': 1
    }
  };

  beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.provideStore('gridInfo')],
        providers: [
              IldaGridService,
              MockBackend,
              BaseRequestOptions,
              {provide: Http, useFactory: (back, options) => {
                return new Http(back, options);
              }, deps: [MockBackend, BaseRequestOptions]}
        ]})
  );

  beforeEach(inject([IldaGridService, MockBackend], (service, back) => {
    testObject = service;
    backend = back;
  }));

  it('should load data grid', () => {
    backend.connections.subscribe((connect) => {
      connection = connect;
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: responseObject1})
        )
      );
    });

    testObject.loadData('link', 'unites').subscribe(res => {
      expect(res._embedded.values[0]).toEqual('resultats');
      expect(res._embedded.unites).toBeUndefined();
      expect(res._links.first.href).toEqual('link_to_first');
      expect(res._links.prev.href).toEqual('link_to_prev');
      expect(res._links.self.href).toEqual('link_to_self');
      expect(res._links.next.href).toEqual('link_to_next');
      expect(res._links.last.href).toEqual('link_to_last');
      expect(res.pages.size).toEqual(10);
      expect(res.pages.totalElements).toEqual(30);
      expect(res.pages.totalPages).toEqual(3);
      expect(res.pages.number).toEqual(1);
      expect(res.info.prop).toEqual('unites');
    });

    expect(connection.request.url).toEqual('link');
    expect(connection.request.method).toBe(RequestMethod.Get);

  });

  it('should sort data grid', () => {
    backend.connections.subscribe((connect) => {
      connection = connect;
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: responseObject2})
        )
      );
    });

    let sort = {link: 'link', prop: 'unites'};

    testObject.sortData(sort).subscribe(res => {
      expect(res._embedded.values[0]).toEqual('resultats');
      expect(res._embedded.unites).toBeUndefined();
      expect(res._links.first.href).toEqual('link_to_first');
      expect(res._links.prev.href).toEqual('link_to_prev');
      expect(res._links.self.href).toEqual('link_to_self');
      expect(res._links.next.href).toEqual('link_to_next');
      expect(res._links.last.href).toEqual('link_to_last');
      expect(res.pages.size).toEqual(10);
      expect(res.pages.totalElements).toEqual(30);
      expect(res.pages.totalPages).toEqual(3);
      expect(res.pages.number).toEqual(1);
      expect(res.info.prop).toEqual('unites');
    });

    expect(connection.request.url).toEqual('link');
    expect(connection.request.method).toBe(RequestMethod.Get);
  });

  it('should refresh data grid', () => {
    backend.connections.subscribe((connect) => {
      connection = connect;
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: responseObject3})
        )
      );
    });

    let info = new GridInfo();
    info.current = 'link';
    info.prop = 'unites';

    testObject.refreshData(info).subscribe(res => {
      expect(res._embedded.values[0]).toEqual('resultats');
      expect(res._embedded.unites).toBeUndefined();
      expect(res._links.first.href).toEqual('link_to_first');
      expect(res._links.prev.href).toEqual('link_to_prev');
      expect(res._links.self.href).toEqual('link_to_self');
      expect(res._links.next.href).toEqual('link_to_next');
      expect(res._links.last.href).toEqual('link_to_last');
      expect(res.pages.size).toEqual(10);
      expect(res.pages.totalElements).toEqual(30);
      expect(res.pages.totalPages).toEqual(3);
      expect(res.pages.number).toEqual(1);
      expect(res.info.prop).toEqual('unites');
    });

    expect(connection.request.url).toEqual('link');
    expect(connection.request.method).toBe(RequestMethod.Get);
  });

  it('should refresh data grid after delete - Return to previous page', () => {
    backend.connections.subscribe((connect) => {
      connection = connect;
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: responseObject3})
        )
      );
    });

    let info = new GridInfo();
    info.current = 'link_to_self';
    info.prev = 'link_to_prev_a_moi';
    info.prop = 'unites';
    info.currentPage = 3;
    info.values = ['a'];

    testObject.refreshDataAfterDelete(info).subscribe(res => {
      expect(res._embedded.unites).toBeUndefined();
      expect(res._links.first.href).toEqual('link_to_first');
      expect(res._links.prev.href).toEqual('link_to_prev');
      expect(res._links.self.href).toEqual('link_to_self');
      expect(res._links.next.href).toEqual('link_to_next');
      expect(res._links.last.href).toEqual('link_to_last');
      expect(res.pages.size).toEqual(10);
      expect(res.pages.totalElements).toEqual(30);
      expect(res.pages.totalPages).toEqual(3);
      expect(res.pages.number).toEqual(1);
      expect(res.info.prop).toEqual('unites');
    });

    // On s'attend à être retourné sur la page précédente
    expect(connection.request.url).toEqual('link_to_prev_a_moi');
    expect(connection.request.method).toBe(RequestMethod.Get);
  });

  it('should refresh data grid after delete - Stay on same page', () => {
    backend.connections.subscribe((connect) => {
      connection = connect;
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: responseObject3})
        )
      );
    });

    let info = new GridInfo();
    info.current = 'link_to_self_bidule';
    info.prev = 'link_to_prev';
    info.prop = 'unites';
    info.currentPage = 3;
    info.values = ['a', 'b'];

    testObject.refreshDataAfterDelete(info).subscribe(res => {
      expect(res._embedded.unites).toBeUndefined();
      expect(res._links.first.href).toEqual('link_to_first');
      expect(res._links.prev.href).toEqual('link_to_prev');
      expect(res._links.self.href).toEqual('link_to_self');
      expect(res._links.next.href).toEqual('link_to_next');
      expect(res._links.last.href).toEqual('link_to_last');
      expect(res.pages.size).toEqual(10);
      expect(res.pages.totalElements).toEqual(30);
      expect(res.pages.totalPages).toEqual(3);
      expect(res.pages.number).toEqual(1);
      expect(res.info.prop).toEqual('unites');
    });

    // On s'attend à être retourné sur la page précédente
    expect(connection.request.url).toEqual('link_to_self_bidule');
    expect(connection.request.method).toBe(RequestMethod.Get);
  });

  it('should delete item', () => {
    backend.connections.subscribe((connect) => {
      connection = connect;
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: responseObject3})
        )
      );
    });

    testObject.deleteItem('link').subscribe();

    // On s'attend à être retourné sur la page précédente
    expect(connection.request.url).toEqual('link');
    expect(connection.request.method).toBe(RequestMethod.Delete);
  });
});
