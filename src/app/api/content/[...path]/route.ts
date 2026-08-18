import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await props.params;
    const path = params.path.join('/');
    
    // Fallback in case env var is missing during build or runtime
    const contentApiUrl = process.env.NEXT_PUBLIC_CONTENT_API || 'https://amiable-unity-production-1554.up.railway.app';
    const targetUrl = `${contentApiUrl}/${path}`;

    const response = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
      },
      // Ensure we don't cache stale data if the backend updates
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Content API Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from content API' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await props.params;
    const path = params.path.join('/');
    
    // Fallback in case env var is missing during build or runtime
    const contentApiUrl = process.env.NEXT_PUBLIC_CONTENT_API || 'https://amiable-unity-production-1554.up.railway.app';
    const targetUrl = `${contentApiUrl}/${path}`;

    const body = await request.json();

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Content API Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to post to content API' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await props.params;
    const path = params.path.join('/');
    
    const contentApiUrl = process.env.NEXT_PUBLIC_CONTENT_API || 'https://amiable-unity-production-1554.up.railway.app';
    const targetUrl = `${contentApiUrl}/${path}`;

    const body = await request.json();

    const response = await fetch(targetUrl, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Content API Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to patch content API' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await props.params;
    const path = params.path.join('/');
    
    const contentApiUrl = process.env.NEXT_PUBLIC_CONTENT_API || 'https://amiable-unity-production-1554.up.railway.app';
    const targetUrl = `${contentApiUrl}/${path}`;

    const body = await request.json();

    const response = await fetch(targetUrl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Content API Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to put to content API' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await props.params;
    const path = params.path.join('/');
    
    const contentApiUrl = process.env.NEXT_PUBLIC_CONTENT_API || 'https://amiable-unity-production-1554.up.railway.app';
    const targetUrl = `${contentApiUrl}/${path}`;

    const response = await fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Content API Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to delete from content API' },
      { status: 500 }
    );
  }
}
