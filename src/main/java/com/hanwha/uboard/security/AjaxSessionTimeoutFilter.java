package com.hanwha.uboard.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * AJAX 요청시 권한 관련 오류가 생기면 redirect 시키는데,
 * AJAX는 HTTP 상태 코드를 이용해서 에러를 확인해야 하므로,
 * redirect 되기전에 상태 코드를 전송하게함.
 * 
 * @author Miracle
 *
 */
public class AjaxSessionTimeoutFilter implements Filter{
	
	/**
	 * Default AJAX request Header
	 */
	private String ajaxHeader = "AJAX";
	
	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
	    HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        
        if(isAjaxRequest(req)) {
                try {
                	chain.doFilter(req, res);
                } catch (AccessDeniedException e) {
                    res.sendError(HttpServletResponse.SC_FORBIDDEN);
                } catch (AuthenticationException e) {
                    res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                }
        } else
        	chain.doFilter(req, res);
	}

	private boolean isAjaxRequest(HttpServletRequest req) {
		return req.getHeader(ajaxHeader) != null && req.getHeader(ajaxHeader).equals(Boolean.TRUE.toString());
	}


	public void init(FilterConfig filterConfig) throws ServletException {}

	/**
	 * Set AJAX Request Header (Default is AJAX)
	 * @param ajaxHeader
	 */
	public void setAjaxHeader(String ajaxHeader) {
		this.ajaxHeader = ajaxHeader;
	}
}