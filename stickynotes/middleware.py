# The middleware intercepts the HTTP_X_METHODOVERRIDE header in ajax, and act accordingly by forcing the HTTP method
# in the Django side and creating the request.PUT and request.DELETE QueryDict.

from django.http import QueryDict


class HttpPostTunnelingMiddleware(object):
    def process_request(self, request):
        if request.META.has_key('HTTP_X_METHODOVERRIDE'):
            http_method = request.META['HTTP_X_METHODOVERRIDE']
            if http_method.lower() == 'put':
                request.method = 'PUT'
                request.META['REQUEST_METHOD'] = 'PUT'
                request.PUT = QueryDict(request.body)
            if http_method.lower() == 'delete':
                request.method = 'DELETE'
                request.META['REQUEST_METHOD'] = 'DELETE'
                request.DELETE = QueryDict(request.body)
        return None
